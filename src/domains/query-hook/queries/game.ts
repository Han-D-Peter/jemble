import { useMutation } from "@tanstack/react-query";
import GameRepository from "@/domains/query-hook/repository/game";

export const useGameMutation = () => {
  return useMutation(
    ["makeTimeattackResult"],
    GameRepository.requestTimeattack
  );
};
