import ky from "ky";
import {
  CheckFriendsResponse,
  CheckMeResponse,
  CheckUserResponse,
  CheckUsersResponse,
  CreateFriendResponse,
  NetworkResult,
} from "@/interface/network";

class UserRepository {
  getUsers(): Promise<NetworkResult<CheckUsersResponse>> {
    return ky.get(`/api/users`).json();
  }

  getUser(userId: string): Promise<NetworkResult<CheckUserResponse>> {
    return ky.get(`/api/users/${userId}`).json();
  }

  getMe(): Promise<NetworkResult<CheckMeResponse>> {
    return ky.get("/api/users/me").json();
  }
  searchUser(keyword: string): Promise<NetworkResult<CheckUsersResponse>> {
    return ky.get(`/api/users/search?keyword=${keyword}`).json();
  }
}

export default new UserRepository();
