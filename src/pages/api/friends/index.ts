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

interface CheckFriendsResponse {
  friends: User[];
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckFriendsResponse>>
) {
  const session = await getServerSession(req, res, authOptions);

  assert(session !== null, "session is null");

  try {
    const friends = await client.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        following: {
          include: {
            union: true,
          },
        },
      },
    });
    assert(friends !== null, "friends is null");

    const parsedFriends = friends.following.map((friend) => {
      return {
        id: friend.id,
        name: friend.name ?? "",
        email: friend.email ?? "",
        profile_image: friend.email ?? "",
        points: friend.points,
        unionId: friend.unionId,
        union: friend.union,
      };
    });

    res.status(200).json({
      status: "Success",
      data: {
        friends: parsedFriends,
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
