import ky from "ky";
import {
  CheckFriendsResponse,
  CheckRequestFriendResponse,
  CreateFriendRequest,
  CreateFriendResponse,
  NetworkResult,
} from "@/interface/network";

class FriendRepository {
  getFriends(): Promise<NetworkResult<CheckFriendsResponse>> {
    return ky.get("/api/friends").json();
  }

  requestFriend(
    payload: CreateFriendRequest
  ): Promise<NetworkResult<CreateFriendResponse>> {
    return ky
      .post("/api/friends", { json: { userId: payload.friendId } })
      .json();
  }

  acceptFriend(requestId: string): Promise<NetworkResult<null>> {
    return ky.get(`/api/friends/agree/${requestId}`).json();
  }

  checkhasRequestedFriend(
    userId: string
  ): Promise<NetworkResult<CheckRequestFriendResponse>> {
    return ky.get(`/api/users/checkrequest/${userId}`).json();
  }
}

export default new FriendRepository();
