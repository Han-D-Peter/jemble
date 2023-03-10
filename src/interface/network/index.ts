import { Union, User } from "@/api/server/generated";
import { User as UserModel } from "@/interface/model/user";
import { Union as UnionModel } from "@/interface/model/union";
import {
  DonationTransaction,
  RequestFriendTransaction,
  TrasferTransaction,
} from "@/api/server/generated";

type NetworkStatus = "Success" | "Failed";

export type RequestFriendStatus = "Pending" | "Rejected" | "Accepted";

export interface NetworkResult<DataType> {
  status: NetworkStatus;
  message?: string;
  data?: DataType | null;
}

export interface CheckFriendsResponse {
  friends: UserModel[];
}

export interface CreateFriendResponse {}

export interface DonationMutationResponse {
  me: User;
  union: Union;
}

export interface DonationMutationRequest {
  targetUnion: string;
  amount: number;
}

export interface TransferMutationResponse {
  me: User;
  friend: User;
}

export interface TransferMutationRequest {
  targetUser: string;
  amount: number;
}

export interface CheckTransactionResponse {
  transactions: (
    | DonationTransaction
    | TrasferTransaction
    | RequestFriendTransaction
  )[];
}

export interface UnionWithRank extends UnionModel {
  rank: number;
}

export interface CheckUnionRankResponse {
  union: UnionWithRank;
}

export interface CheckUnionsRankResponse {
  unions: UnionWithRank[];
}

export interface CheckUnionResponse {
  union: UnionModel;
}

export interface CreateUnionRespnse {
  union: UnionModel;
}

export interface CheckUnionsResponse {
  unions: UnionModel[];
}

export interface CheckMyUnionResponse {
  union: UnionModel;
}

export interface CheckUserResponse {
  user: User;
}
export interface CheckUsersResponse {
  users: User[];
}

export interface CheckMeResponse {
  me: UserModel;
}
