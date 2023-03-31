import { useMutation, useQuery } from "@tanstack/react-query";
import UnionRepository, { CreateUnionPayload } from "../repository/unions";

export const useGetMyUnion = () => {
  return useQuery(["myUnion"], UnionRepository.getGetMyUnion, {
    onError: (error) => console.error(error),
  });
};

export const useGetUnions = () => {
  return useQuery(["unions"], UnionRepository.getUnions, {
    onError: (error) => console.error(error),
  });
};

export const useGetUnion = (name: string) => {
  return useQuery(["union", name], () => UnionRepository.getUnion(name), {
    onError: (error) => console.error(error),
  });
};

export const useGetUnionsRank = () => {
  return useQuery(["unionsRank"], UnionRepository.getUnionsRank, {
    onError: (error) => console.error(error),
  });
};

export const useGetUnionRank = (name: string) => {
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
