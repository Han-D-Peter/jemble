// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import { isEqualOrAfter } from "@toss/date";
import { NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";
import {
  getDonationTransactions,
  getFriendTransactions,
  getTransferTransactions,
} from "@/libs/server/transaction";
import {
  DonationTransaction,
  RequestFriendTransaction,
  TrasferTransaction,
} from "@/api/server/generated";

interface CheckTransactionResponse {
  transactions: (
    | DonationTransaction
    | TrasferTransaction
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
    return res
      .status(200)
      .json({ status: "Success", data: { transactions: sortedTransactions } });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "DB Error",
    });
  }
}

export default withHandler({ methods: ["GET"], handler, isPrivate: true });
