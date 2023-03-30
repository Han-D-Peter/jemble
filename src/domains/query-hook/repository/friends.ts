import { requestInstance } from "@/api/network";
import {
  CheckFriendsResponse,
  CheckRequestFriendResponse,
  CreateFriendRequest,
  CreateFriendResponse,
  NetworkResult,
} from "@/interface/network";

type FriendRequestType = "Accepted" | "Rejected";

class FriendRepository {
  getFriends(): Promise<NetworkResult<CheckFriendsResponse>> {
    return requestInstance.get<CheckFriendsResponse>("/api/friends");
  }

  requestFriend(
    payload: CreateFriendRequest
  ): Promise<NetworkResult<CreateFriendResponse>> {
    return requestInstance.post<CreateFriendResponse>("/api/friends", {
      json: { userId: payload.friendId },
    });
  }

  acceptFriend({
    requestId,
    condition,
  }: {
    requestId: string;
    condition: FriendRequestType;
  }): Promise<NetworkResult<null>> {
    return requestInstance.get(
      `/api/friends/agree/${requestId}?condition=${condition}`
    );
  }

  checkhasRequestedFriend(
    userId: string
  ): Promise<NetworkResult<CheckRequestFriendResponse>> {
    return requestInstance.get<CheckRequestFriendResponse>(
      `/api/users/checkrequest/${userId}`
    );
  }
}

export default new FriendRepository();
