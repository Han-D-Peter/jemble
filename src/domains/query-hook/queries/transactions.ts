import { useQuery } from "@tanstack/react-query";
import TransactionRepository from "@/domains/query-hook/repository/transactions";

export const useGetTransactions = () => {
  return useQuery(["transactions"], TransactionRepository.getTransactions);
};
