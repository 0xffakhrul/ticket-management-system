import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMessage,
  createTicket,
  getTicket,
  getTickets,
  Ticket,
  updateTicket,
} from "./request";

export const useTickets = () => {
  return useQuery<Ticket[], Error>({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });
};

export const useTicket = (id: string) => {
  return useQuery<Ticket, Error>({
    queryKey: ["ticket", id],
    queryFn: () => getTicket(id),
    enabled: !!id,
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      userId,
      message,
      senderName,
      senderImageUrl,
    }: {
      ticketId: string;
      userId: string;
      message: string;
      senderName: string;
      senderImageUrl: string;
    }) => createMessage(ticketId, userId, message, senderName, senderImageUrl),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ticket", variables.ticketId],
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTicket,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tickets", variables._id],
      });
    },
  });
};
