import ky from "ky";
import {
  DonationMutationRequest,
  DonationMutationResponse,
  NetworkResult,
  TransferMutationRequest,
  TransferMutationResponse,
} from "@/interface/network";

class TradeRepository {
  transferPointToFriend(
    payload: TransferMutationRequest
  ): Promise<NetworkResult<TransferMutationResponse>> {
    return ky.post("/api/trade/user", { json: payload }).json();
  }

  transferPointToUnion(
    payload: DonationMutationRequest
  ): Promise<NetworkResult<DonationMutationResponse>> {
    return ky.post("/api/trade/union", { json: payload }).json();
  }
}

export default new TradeRepository();
