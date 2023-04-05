import { useQuery } from "@tanstack/react-query";
import TransactionRepository from "@/domains/query-hook/repository/transactions";

export const useTransactions = () => {
  return useQuery(["transactions"], TransactionRepository.getTransactions);
};
