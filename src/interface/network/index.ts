type NetworkStatus = "Success" | "Failed";

export type RequestFriendStatus = "Pending" | "Rejected" | "Accepted";

export interface NetworkResult<DataType> {
  status: NetworkStatus;
  message?: string;
  data?: DataType | null;
}
