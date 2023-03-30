import {
  CheckMeResponse,
  CheckUserResponse,
  CheckUsersResponse,
  NetworkResult,
} from "@/interface/network";
import { requestInstance } from "@/api/network";

class UserRepository {
  getUsers(): Promise<NetworkResult<CheckUsersResponse>> {
    return requestInstance.get<CheckUsersResponse>(`/api/users`);
  }

  getUser(userId: string): Promise<NetworkResult<CheckUserResponse>> {
    return requestInstance.get<CheckUserResponse>(`/api/users/${userId}`);
  }

  getMe(): Promise<NetworkResult<CheckMeResponse>> {
    return requestInstance.get<CheckMeResponse>("/api/users/me");
  }
  searchUser(keyword: string): Promise<NetworkResult<CheckUsersResponse>> {
    return requestInstance.get<CheckUsersResponse>(
      `/api/users/search?keyword=${keyword}`
    );
  }
}

export default new UserRepository();
