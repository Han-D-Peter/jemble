// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import _ from "lodash";
import { CheckUsersResponse, NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import client from "@/libs/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckUsersResponse>>
) {
  const session = await getServerSession(req, res, authOptions);
  const searchKeyWord = req.query.keyword as string;

  assert(session !== null, "session is null");

  try {
    const users = await client.user.findMany({
      where: { name: { contains: searchKeyWord } },
    });
    const friends = await client.user.findUnique({
      where: {
        id: session.user.id,
      },

      select: {
        following: true,
      },
    });
    const me = await client.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    assert(users !== null, "users is null");
    assert(friends !== null, "users is null");
    console.log("users", users);

    const result = _.differenceBy(users, friends.following).filter(
      item => item.id !== session.user.id
    );

    res.status(200).json({
      status: "Success",
      data: {
        users: result,
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
