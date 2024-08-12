import axios from "axios";

const BASE_URL = "http://localhost:6969/api/tickets";

export interface Ticket {
  _id: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  messages: {
    senderId: string;
    message: string;
    date: Date;
  }[];
}

export const getTickets = async (): Promise<Ticket[]> => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};

export const getTicket = async (id: string): Promise<Ticket> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createTicket = async (
  ticket: Omit<Ticket, "_id">
): Promise<Ticket> => {
  const response = await axios.post(BASE_URL, ticket);
  return response.data;
};
