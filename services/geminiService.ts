import { GoogleGenAI, Type, FunctionDeclaration, GenerateContentResponse, Part, Content } from "@google/genai";
import type { Message, FlightDetails } from '../types';
import { MessageRole } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const tools: FunctionDeclaration[] = [
  {
    name: "search_flights",
    description: "Searches for available flights based on departure, arrival, and date.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        departure_city: { type: Type.STRING, description: "The city or airport code for departure." },
        arrival_city: { type: Type.STRING, description: "The city or airport code for arrival." },
        date: { type: Type.STRING, description: "The desired date of travel in YYYY-MM-DD format." },
      },
      required: ["departure_city", "arrival_city", "date"],
    },
  },
  {
    name: "query_policy_document",
    description: "Queries the airline policy knowledge base for information on topics like baggage allowance, cancellation fees, etc.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: "The specific policy question to ask." },
      },
      required: ["query"],
    },
  },
];

const mockFlightData: FlightDetails[] = [
    {
        flightNumber: "UA482", airline: "United Airlines",
        departure: { airport: "JFK", city: "New York", time: "08:30" },
        arrival: { airport: "LAX", city: "Los Angeles", time: "11:45" },
        duration: "6h 15m", price: 350, stops: 0
    },
    {
        flightNumber: "DL123", airline: "Delta Airlines",
        departure: { airport: "JFK", city: "New York", time: "09:15" },
        arrival: { airport: "LAX", city: "Los Angeles", time: "14:00" },
        duration: "7h 45m", price: 280, stops: 1
    },
    {
        flightNumber: "AA789", airline: "American Airlines",
        departure: { airport: "JFK", city: "New York", time: "10:00" },
        arrival: { airport: "LAX", city: "Los Angeles", time: "13:10" },
        duration: "6h 10m", price: 410, stops: 0
    }
];

// Mocks the execution of a tool call.
const executeTool = (name: string, args: any): { content: any } => {
  console.log(`Executing tool: ${name} with args:`, args);
  if (name === "search_flights") {
    // Return a subset of mock data, slightly randomized
    const numFlights = Math.floor(Math.random() * 2) + 1;
    const flights = [...mockFlightData].sort(() => 0.5 - Math.random()).slice(0, numFlights);
    return { content: { flights } };
  }
  if (name === "query_policy_document") {
    let policyText = "According to our policy documents, standard checked baggage allowance is one bag up to 50 lbs (23 kg).";
    if (args.query.toLowerCase().includes("cancel")) {
        policyText = "Cancellations made more than 24 hours after booking are subject to a $200 fee. Cancellations within 24 hours of booking are fully refundable."
    } else if (args.query.toLowerCase().includes("pet")) {
        policyText = "Small pets in carriers are allowed in the cabin for a fee of $125 each way. The carrier must fit under the seat in front of you."
    }
    return { content: { policy: policyText } };
  }
  return { content: { error: "Unknown tool" } };
};

export const runChat = async (prompt: string, history: Message[]): Promise<{ text: string; flights?: FlightDetails[] }> => {
    const model = 'gemini-2.5-pro';
    const config = {
        tools: [{ functionDeclarations: tools }],
        systemInstruction: "You are a friendly and professional airline travel assistant. Your goal is to help users find flights and understand airline policies. When presenting flight options, be concise and clear. When answering policy questions, be direct and helpful."
    };

    const contents: Content[] = history.map(msg => ({
        role: msg.role === MessageRole.ASSISTANT ? 'model' : 'user',
        parts: [{ text: msg.text }]
    }));

    contents.push({ role: 'user', parts: [{ text: prompt }] });

    let response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents,
        config
    });

    let returnedFlights: FlightDetails[] | undefined = undefined;

    while (response.functionCalls && response.functionCalls.length > 0) {
        // Add the model's response with the function call to the history
        if (response.candidates && response.candidates.length > 0) {
            contents.push(response.candidates[0].content);
        } else {
             return { text: "An unexpected error occurred while processing function calls." };
        }
        
        const functionResponseParts: Part[] = [];

        for (const funcCall of response.functionCalls) {
            const { name, args } = funcCall;
            const { content } = executeTool(name, args);
            
            if (name === 'search_flights' && content.flights) {
              returnedFlights = content.flights;
            }

            functionResponseParts.push({
                functionResponse: {
                    name,
                    response: content,
                },
            });
        }
        
        // Add the tool responses to the history
        contents.push({
            role: 'tool',
            parts: functionResponseParts
        });

        // Make the next API call
        response = await ai.models.generateContent({
            model,
            contents,
            config
        });
    }

    return { text: response.text, flights: returnedFlights };
};