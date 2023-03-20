import { useQuery } from "@tanstack/react-query";
import UserRepository from "@/domains/query-hook/repository/users";

export const useGetUsers = () => {
  return useQuery(["users"], UserRepository.getUsers);
};

export const useGetUser = (userId: string) => {
  return useQuery(["user", userId], () => UserRepository.getUser(userId));
};

export const useGetMe = () => {
  return useQuery(["me"], UserRepository.getMe);
};

export const useSearchUsersByKeyword = (keyword: string) => {
  return useQuery(["searchusers"], () => UserRepository.searchUser(keyword), {
    enabled: !!keyword,
    staleTime: 0,
    cacheTime: 0,
  });
};
