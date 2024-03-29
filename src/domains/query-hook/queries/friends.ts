import { useMutation, useQuery } from "@tanstack/react-query";
import FriendRepository from "@/domains/query-hook/repository/friends";

export const useFriends = () => {
  return useQuery(["friends"], FriendRepository.getFriends);
};

export const useRequestFriendMutation = () => {
  return useMutation(["requestFriend"], FriendRepository.requestFriend);
};

export const useCheckRequestFriend = (userId: string) => {
  return useQuery(["requestFriend", userId], () =>
    FriendRepository.checkhasRequestedFriend(userId)
  );
};

export const useAcceptRequestFriendMutation = () => {
  return useMutation(["acceptFriendRequest"], FriendRepository.acceptFriend);
};
