import { useMutation, useQuery } from "@tanstack/react-query";
import UnionRepository, { CreateUnionPayload } from "../repository/unions";

export const useMyUnion = () => {
  return useQuery(["myUnion"], UnionRepository.getGetMyUnion, {
    onError: (error) => console.error(error),
  });
};

export const useUnions = () => {
  return useQuery(["unions"], UnionRepository.getUnions, {
    onError: (error) => console.error(error),
  });
};

export const useUnion = (name: string) => {
  return useQuery(["union", name], () => UnionRepository.getUnion(name), {
    onError: (error) => console.error(error),
  });
};

export const useUnionsRank = () => {
  return useQuery(["unionsRank"], UnionRepository.getUnionsRank, {
    onError: (error) => console.error(error),
  });
};

export const useUnionRank = (name: string) => {
  return useQuery(
    ["unionRank", name],
    () => UnionRepository.getUnionRank(name),
    {
      onError: (error) => console.error(error),
    }
  );
};

export const useCreateUnionMutation = () => {
  return useMutation(["createUnion"], UnionRepository.createUnion, {
    onError: (error) => console.error(error),
  });
};

export const useJoinUnionMutation = () => {
  return useMutation(["joinUnion"], UnionRepository.joinUnion, {
    onError: (error) => console.error(error),
  });
};
