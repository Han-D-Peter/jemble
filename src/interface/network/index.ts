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

export interface CreateFriendRequest {
  friendId: string;
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

export type CheckUnionRankResponse = UnionWithRank;

export type CheckUnionsRankResponse = UnionWithRank[];

export type CheckUnionResponse = UnionModel;

export type CreateUnionRespnse = UnionModel;

export type CheckUnionsResponse = UnionModel[];

export type CheckMyUnionResponse = UnionModel;

export type CheckUserResponse = { user: User };

export type CheckUsersResponse = { users: User[] };

export type CheckRequestFriendResponse = { isPending: boolean };

export interface CheckMeResponse {
  me: UserModel;
}

export type TimeattckResponse = { currentPoint: number };
