// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@/api/server/generated";
import { Union } from "@/interface/model/union";
import { User } from "@/interface/model/user";
import { NetworkResult } from "@/interface/network";
import client from "@/libs/client";
import withHandler from "@/libs/server/withHandler";
import assert from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface CheckMeResponse {
  me: User;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckMeResponse>>
) {
  const session = await getServerSession(req, res, authOptions);

  assert(session !== null, "session is null");

  try {
    const me = await client.user.findUnique({
      where: {
        id: session.user.id,
      },

      include: {
        union: true,
        following: {
          include: { union: true },
        },
      },
    });
    assert(me !== null, "me is null");

    const friends = me.following.map((user) => {
      return {
        id: user.id,
        name: user.name ?? "",
        email: user.email ?? "",
        profile_image: user.email ?? "",
        points: user.points,
        unionId: user.unionId,
        union: user.union,
      };
    });

    res.status(200).json({
      status: "Success",
      data: {
        me: {
          id: me.id,
          name: me.name ?? "",
          email: me.email ?? "",
          profile_image: me.email ?? "",
          points: me.points,
          unionId: me.unionId,
          union: me.union,
          friends,
        },
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
