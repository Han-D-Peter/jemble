import {
  CheckMyUnionResponse,
  CheckUnionRankResponse,
  CheckUnionsRankResponse,
  CheckUnionsResponse,
  CreateUnionRespnse,
  NetworkResult,
} from "@/interface/network";
import ky from "ky";

export type CreateUnionPayload = {
  name: string;
};

class UnionRepository {
  getGetMyUnion(): Promise<NetworkResult<CheckMyUnionResponse>> {
    return ky.get("/api/unions/mine").json();
  }

  getUnions(): Promise<NetworkResult<CheckUnionsResponse>> {
    return ky.get("/api/unions").json();
  }

  getUnion(name: string): Promise<NetworkResult<CheckMyUnionResponse>> {
    return ky.get(`/api/unions/${name}`).json();
  }

  joinUnion({
    name,
  }: {
    name: string;
  }): Promise<NetworkResult<CreateUnionRespnse>> {
    return ky.post(`/api/unions/${name}`, {}).json();
  }

  createUnion(
    payload: CreateUnionPayload
  ): Promise<NetworkResult<CreateUnionRespnse>> {
    return ky.post(`/api/unions/`, { json: payload }).json();
  }

  getUnionRank(name: string): Promise<NetworkResult<CheckUnionRankResponse>> {
    return ky.get(`/api/unions/rank/${name}`).json();
  }

  getUnionsRank(): Promise<NetworkResult<CheckUnionsRankResponse>> {
    return ky.get("/api/unions/rank").json();
  }

  searchUnions(name: string): Promise<NetworkResult<CheckUnionsResponse>> {
    return ky.get(`/api/unions/search?keyword=${name}`).json();
  }
}

export default new UnionRepository();
