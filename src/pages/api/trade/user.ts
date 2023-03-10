// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import {
  NetworkResult,
  TransferMutationRequest,
  TransferMutationResponse,
} from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";
import { transferUser } from "@/libs/server/trade";
import { makeTransferTransaction } from "@/libs/server/transaction";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<TransferMutationResponse>>
) {
  const session = await getServerSession(req, res, authOptions);
  assert(session !== null, "session is null");
  const transferRequest: TransferMutationRequest | null = req.body;
  if (!transferRequest) {
    return res.status(400).json({
      status: "Failed",
      message: "송신에 필요한 정보가 없습니다.",
    });
  }
  if (!transferRequest.amount) {
    return res.status(404).json({
      status: "Failed",
      message: "송신에 필요한 금액 정보가 없습니다.",
    });
  }
  if (!transferRequest.targetUser) {
    return res.status(404).json({
      status: "Failed",
      message: "송신에 필요한 상대방 정보가 없습니다.",
    });
  }

  if (transferRequest.amount <= 0) {
    return res.status(404).json({
      status: "Failed",
      message: "송신할 포인트는 0보다 커야합니다.",
    });
  }

  try {
    await transferUser(
      session.user.id,
      transferRequest.targetUser,
      transferRequest.amount,
      res
    );
    await makeTransferTransaction(
      session.user.id,
      transferRequest.targetUser,
      transferRequest.amount
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "DB Error",
    });
  }
}

export default withHandler({ methods: ["POST"], handler, isPrivate: true });
