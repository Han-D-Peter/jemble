// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import { CheckMeResponse, NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";
import client from "@/libs/client";

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
        profile_image: user.profile_image ?? "",
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
