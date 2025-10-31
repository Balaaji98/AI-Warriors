
import { GoogleGenAI } from "@google/genai";
import { ClassifiedInventoryItem, Settings, Category } from '../types';

export const generateSuggestion = async (item: ClassifiedInventoryItem, settings: Settings): Promise<string> => {
    // This check is a safeguard. In a real app, you'd handle the API key more securely.
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const { min, max } = settings.thresholds[item.category];
    let stockStatus = 'Normal';
    if (item.quantity < min) {
        stockStatus = `Critically Low (below minimum of ${min})`;
    } else if (item.quantity > max) {
        stockStatus = `Overstocked (above maximum of ${max})`;
    }

    const prompt = `
        You are an expert warehouse operations supervisor.
        Analyze the following inventory item and provide a concise, actionable recommendation.

        Item Details:
        - Name: ${item.name}
        - Category: ${item.category} (A=High-value, B=Medium-value, C=Low-value)
        - Current Quantity: ${item.quantity}
        - Unit Cost: $${item.unitCost.toFixed(2)}
        - Total Value: $${item.totalValue.toFixed(2)}
        - Contribution to Total Inventory Value: ${item.percentageOfTotal.toFixed(2)}%

        Inventory Rules for Category ${item.category}:
        - Minimum Stock Level: ${min}
        - Maximum Stock Level: ${max}

        Current Stock Status: ${stockStatus}

        Based on this data, provide a clear, one-paragraph recommendation.
        Focus on priorities. For example, for a low-stock Category A item, stress urgency. For an overstocked Category C item, suggest promotions or bundling.
        Start your response with a clear title like "Recommendation for ${item.name}:".
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
};
