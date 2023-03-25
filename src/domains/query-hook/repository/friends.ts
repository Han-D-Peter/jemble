import ky from "ky";
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
    return ky.get("/api/friends").json();
  }

  requestFriend(
    payload: CreateFriendRequest
  ): Promise<NetworkResult<CreateFriendResponse>> {
    return ky
      .post("/api/friends", { json: { userId: payload.friendId } })
      .json();
  }

  acceptFriend({
    requestId,
    condition,
  }: {
    requestId: string;
    condition: FriendRequestType;
  }): Promise<NetworkResult<null>> {
    return ky
      .get(`/api/friends/agree/${requestId}?condition=${condition}`)
      .json();
  }

  checkhasRequestedFriend(
    userId: string
  ): Promise<NetworkResult<CheckRequestFriendResponse>> {
    return ky.get(`/api/users/checkrequest/${userId}`).json();
  }
}

export default new FriendRepository();
