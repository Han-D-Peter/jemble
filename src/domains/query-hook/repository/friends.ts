import ky from "ky";
import {
  CheckFriendsResponse,
  CreateFriendResponse,
  NetworkResult,
} from "@/interface/network";

class FriendRepository {
  getFriends(): Promise<NetworkResult<CheckFriendsResponse>> {
    return ky.get("/api/friends").json();
  }

  requestFriend(
    friendId: string
  ): Promise<NetworkResult<CreateFriendResponse>> {
    return ky.post("/api/friends", { json: { userId: friendId } }).json();
  }

  acceptFriend(requestId: string): Promise<NetworkResult<null>> {
    return ky.get(`/api/friends/agree/${requestId}`).json();
  }
}

export default new FriendRepository();
