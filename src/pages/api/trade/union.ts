// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import { NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";
import { Union, User } from "@/api/server/generated";
import { transferUnion } from "@/libs/server/trade";

export interface DonationMutationResponse {
  me: User;
  union: Union;
}

interface DonationMutationRequest {
  targetUnion: string;
  amount: number;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<DonationMutationResponse>>
) {
  const session = await getServerSession(req, res, authOptions);
  assert(session !== null, "session is null");
  const transferRequest: DonationMutationRequest | null = req.body;
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
  if (!transferRequest.targetUnion) {
    return res.status(404).json({
      status: "Failed",
      message: "송신에 필요한 유니온 정보가 없습니다.",
    });
  }

  if (transferRequest.amount <= 0) {
    return res.status(404).json({
      status: "Failed",
      message: "송신할 포인트는 0보다 커야합니다.",
    });
  }

  try {
    await transferUnion(
      session.user.id,
      transferRequest.targetUnion,
      transferRequest.amount,
      res
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
