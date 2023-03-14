import { useMutation, useQuery } from "@tanstack/react-query";
import UnionRepository, { CreateUnionPayload } from "../repository/unions";

export const useGetMyUnion = () => {
  return useQuery(["myUnion"], () => UnionRepository.getGetMyUnion());
};

export const useGetUnions = () => {
  return useQuery(["unions"], () => UnionRepository.getUnions());
};

export const useGetUnion = (name: string) => {
  return useQuery(["union", name], () => UnionRepository.getUnion(name));
};

export const useGetUnionsRank = () => {
  return useQuery(["unionsRank"], () => UnionRepository.getUnionsRank());
};

export const useGetUnionRank = (name: string) => {
  return useQuery(["unionRank", name], () =>
    UnionRepository.getUnionRank(name)
  );
};

export const useCreateUnionMutation = () => {
  return useMutation(["createUnion"], (payload: CreateUnionPayload) =>
    UnionRepository.createUnion(payload)
  );
};

export const useJoinUnionMutation = (name: string) => {
  return useMutation(["joinUnion"], () => UnionRepository.joinUnion(name));
};
