// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import { User } from "@/api/server/generated";
import { NetworkResult } from "@/interface/network";
import client from "@/libs/client";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";

interface CheckUsersResponse {
  users: User[];
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckUsersResponse>>
) {
  const session = await getServerSession(req, res, authOptions);

  assert(session !== null, "session is null");

  try {
    const users = await client.user.findMany({
      include: {
        union: true,
      },
    });
    assert(users !== null, "me is null");

    res.status(200).json({
      status: "Success",
      data: {
        users,
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
