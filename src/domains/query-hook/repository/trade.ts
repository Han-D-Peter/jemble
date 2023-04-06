import { requestInstance } from "@/api/network";
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
    return requestInstance.post<TransferMutationResponse>(
      "/api/trade/user",
      payload
    );
  }

  transferPointToUnion(
    payload: DonationMutationRequest
  ): Promise<NetworkResult<DonationMutationResponse>> {
    return requestInstance.post<DonationMutationResponse>(
      "/api/trade/union",
      payload
    );
  }
}

export default new TradeRepository();
