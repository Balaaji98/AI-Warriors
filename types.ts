
export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  TOOL = 'tool',
}

export interface FlightDetails {
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    time: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
  };
  duration: string;
  price: number;
  stops: number;
}

export interface Message {
  role: MessageRole;
  text: string;
  flights?: FlightDetails[];
}
