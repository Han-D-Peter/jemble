// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import { NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";
import client from "@/libs/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<{ currentPoint: number }>>
) {
  const { result, amount } = req.query;

  const session = await getServerSession(req, res, authOptions);
  assert(session !== null, "session is null");

  try {
    const user = await client.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    assert(user !== null, "user is null");

    if (user.points <= Number(amount)) {
      return res.status(404).json({
        status: "Failed",
        message: "베팅 금액이 보유 금액을 초과합니다.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      message: JSON.stringify(error),
    });
  }

  if (result === "win") {
    try {
      const user = await client.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          points: { increment: Number(amount) * 4 },
        },
      });
      return res.status(200).json({
        status: "Success",
        data: { currentPoint: user.points },
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: JSON.stringify(error),
      });
    }
  }

  if (result === "lose") {
    try {
      const user = await client.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          points: { decrement: Number(amount) },
        },
      });
      return res.status(200).json({
        status: "Success",
        data: { currentPoint: user.points },
      });
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        message: JSON.stringify(error),
      });
    }
  }

  res.status(400).json({ status: "Failed", message: "알 수 없는 오류" });
}

export default withHandler({ methods: ["GET"], handler, isPrivate: true });
