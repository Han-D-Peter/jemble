// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { CheckRequestFriendResponse, NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import client from "@/libs/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckRequestFriendResponse>>
) {
  const session = await getServerSession(req, res, authOptions);
  const userId = req.query.userId as string;
  assert(session !== null, "session is null");
  try {
    const transactions = await client.requestFriendTransaction.findMany({
      where: {
        OR: [
          {
            sender: session?.user.id,
            receiver: userId,
          },
          {
            sender: userId,
            receiver: session?.user.id,
          },
        ],
      },
    });

    if (transactions.length === 0)
      return res.status(200).json({
        status: "Success",
        data: {
          isPending: false,
        },
      });

    res.status(200).json({
      status: "Success",
      data: {
        isPending: true,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "DB Error",
    });
  }
}

export default withHandler({ methods: ["GET"], handler, isPrivate: true });
