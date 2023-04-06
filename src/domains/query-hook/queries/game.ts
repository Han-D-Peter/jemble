import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import GameRepository from "@/domains/query-hook/repository/game";
import { NetworkResult, TimeattckResponse } from "@/interface/network";

export const useGameMutation = (
  options:
    | Omit<
        UseMutationOptions<
          NetworkResult<TimeattckResponse>,
          unknown,
          { result: "win" | "lose"; amount: number },
          unknown
        >,
        "mutationKey" | "mutationFn"
      >
    | undefined
) => {
  return useMutation(
    ["makeTimeattackResult"],
    GameRepository.requestTimeattack,
    options
  );
};
