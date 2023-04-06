import { useQuery } from "@tanstack/react-query";
import UserRepository from "@/domains/query-hook/repository/users";

export const useUsers = () => {
  return useQuery(["users"], UserRepository.getUsers);
};

export const useUser = (userId: string) => {
  return useQuery(["user", userId], () => UserRepository.getUser(userId));
};

export const useMe = () => {
  return useQuery(["me"], UserRepository.getMe);
};

export const useSearchedUsersByKeyword = (keyword: string) => {
  return useQuery(["searchusers"], () => UserRepository.searchUser(keyword), {
    enabled: !!keyword,
    staleTime: 0,
    cacheTime: 0,
  });
};
