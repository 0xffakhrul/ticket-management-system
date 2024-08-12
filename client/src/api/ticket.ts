import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTicket, getTicket, getTickets, Ticket } from "./request";

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
