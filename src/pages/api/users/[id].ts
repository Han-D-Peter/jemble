// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { CheckUserResponse, NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import client from "@/libs/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckUserResponse>>
) {
  const userId = req.query.id;
  try {
    const user = await client.user.findUnique({
      where: { id: userId as string },
      include: {
        union: true,
      },
    });
    assert(user !== null, "user is null");

    res.status(200).json({
      status: "Success",
      data: {
        user,
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
