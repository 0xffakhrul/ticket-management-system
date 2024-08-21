import axios from "axios";

const BASE_URL = "http://localhost:6969/api/tickets";

export interface Ticket {
  _id: string;
  subject: string;
  userId: string;
  description: string;
  priority: string;
  status: string;
  messages: {
    senderId: string;
    sender: { name: string; imageUrl: string };
    message: string;
    date: Date;
  }[];
  createdAt: string;
  user: {
    name: string;
    imageUrl: string;
  };
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
  ticket: Omit<Ticket, "_id" | "createdAt">
): Promise<Ticket> => {
  const response = await axios.post(BASE_URL, ticket);
  return response.data;
};

export const createMessage = async (
  ticketId: string,
  userId: string,
  message: string,
  senderName: string,
  senderImageUrl: string
): Promise<Ticket> => {
  const response = await axios.put(`${BASE_URL}/${ticketId}`, {
    newMessage: message,
    userId: userId,
    senderName: senderName,
    senderImageUrl: senderImageUrl,
  });
  return response.data;
};

export const updateTicket = async (ticket: Ticket): Promise<Ticket> => {
  const response = await axios.patch<Ticket>(
    `${BASE_URL}/${ticket._id}`,
    ticket
  );
  return response.data;
};
