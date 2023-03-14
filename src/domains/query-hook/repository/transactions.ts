import ky from "ky";
import { CheckTransactionResponse, NetworkResult } from "@/interface/network";

class TransactionRepository {
  getTransactions(): Promise<NetworkResult<CheckTransactionResponse>> {
    return ky.get("/api/transactions").json();
  }
}

export default new TransactionRepository();
