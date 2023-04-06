import { requestInstance } from "@/api/network";
import { CheckTransactionResponse, NetworkResult } from "@/interface/network";

class TransactionRepository {
  getTransactions(): Promise<NetworkResult<CheckTransactionResponse>> {
    return requestInstance.get<CheckTransactionResponse>("/api/transactions");
  }
}

export default new TransactionRepository();
