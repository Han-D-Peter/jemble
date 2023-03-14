import { useMutation } from "@tanstack/react-query";
import TradeRepository from "@/domains/query-hook/repository/trade";

export const useTransferPointToFriendMutation = () => {
  return useMutation(
    ["transferPointFriend"],
    TradeRepository.transferPointToFriend
  );
};

export const useTransferPointToUnionMutation = () => {
  return useMutation(
    ["transferPointUnion"],
    TradeRepository.transferPointToUnion
  );
};
