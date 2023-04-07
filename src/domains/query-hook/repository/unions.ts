import { requestInstance } from "@/api/network";
import {
  CheckMyUnionResponse,
  CheckUnionRankResponse,
  CheckUnionsRankResponse,
  CheckUnionsResponse,
  CreateUnionRespnse,
  NetworkResult,
} from "@/interface/network";

export type CreateUnionPayload = {
  name: string;
};

class UnionRepository {
  getGetMyUnion(): Promise<NetworkResult<CheckMyUnionResponse>> {
    return requestInstance.get<CheckMyUnionResponse>("/api/unions/mine");
  }

  getUnions(): Promise<NetworkResult<CheckUnionsResponse>> {
    return requestInstance.get<CheckUnionsResponse>("/api/unions");
  }

  getUnion(name: string): Promise<NetworkResult<CheckMyUnionResponse>> {
    return requestInstance.get<CheckMyUnionResponse>(`/api/unions/${name}`);
  }

  joinUnion({
    name,
  }: {
    name: string;
  }): Promise<NetworkResult<CreateUnionRespnse>> {
    return requestInstance.post<CreateUnionRespnse>(`/api/unions/${name}`, {});
  }

  createUnion(
    payload: CreateUnionPayload
  ): Promise<NetworkResult<CreateUnionRespnse>> {
    return requestInstance.post<CreateUnionRespnse>(`/api/unions/`, {
      json: payload,
    });
  }

  getUnionRank(name: string): Promise<NetworkResult<CheckUnionRankResponse>> {
    return requestInstance.get<CheckUnionRankResponse>(
      `/api/unions/rank/${name}`
    );
  }

  getUnionsRank(): Promise<NetworkResult<CheckUnionsRankResponse>> {
    return requestInstance.get<CheckUnionsRankResponse>("/api/unions/rank");
  }

  searchUnions(name: string): Promise<NetworkResult<CheckUnionsResponse>> {
    return requestInstance.get(`/api/unions/search?keyword=${name}`);
  }
}

export default new UnionRepository();
