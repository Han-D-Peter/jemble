export interface NetworkResult<DataType> {
  status: "Success" | "Failed";
  message?: string;
  data?: DataType | null;
}
