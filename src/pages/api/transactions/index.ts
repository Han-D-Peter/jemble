// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import _ from "lodash";
import assert from "assert";
import { isEqualOrAfter } from "@toss/date";
import { NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";
import { User } from "@/interface/model/user";
import client from "@/libs/client";
import {
  getDonationTransactions,
  getFriendTransactions,
  getTransferTransactions,
} from "@/libs/server/transaction";

type DonationTransaction = {
  id: string;
  sender: string;
  unionId: string;
  amount: number;
};

type TransferTransaction = {
  id: string;
  sender: string;
  receiver: string;
  unionId: string;
  amount: number;
};

type RequestFriendTransaction = {
  id: string;
  sender: string;
  reciever: string;
  status: "Accepted" | "Rejected" | "Pending";
};

interface CheckTransactionResponse {
  transaction: (
    | DonationTransaction
    | TransferTransaction
    | RequestFriendTransaction
  )[];
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckTransactionResponse>>
) {
  const session = await getServerSession(req, res, authOptions);

  assert(session !== null, "session is null");

  try {
    const friendTransactions = await getFriendTransactions(session.user.id);
    const transferTransactions = await getTransferTransactions(session.user.id);
    const donationTransactions = await getDonationTransactions(session.user.id);
    const mergedTransactions = [
      ...friendTransactions,
      ...transferTransactions,
      ...donationTransactions,
    ];

    const sortedTransactions = mergedTransactions.sort((x, y) => {
      if (isEqualOrAfter(x.createdAt, y.createdAt)) {
        return -1;
      } else {
        return 1;
      }
    });
    console.log("sortedTransactions", sortedTransactions);
    return res.status(200).json({ status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "DB Error",
    });
  }
}

export default withHandler({ methods: ["GET"], handler, isPrivate: true });
