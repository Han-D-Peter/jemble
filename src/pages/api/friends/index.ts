// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@/api/server/generated";
import { Union } from "@/interface/model/union";
import { User } from "@/interface/model/user";
import { NetworkResult, RequestFriendStatus } from "@/interface/network";
import client from "@/libs/client";
import withHandler from "@/libs/server/withHandler";
import assert from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface CheckFriendsResponse {
  friends: User[];
}

interface CreateFriendResponse {}

async function getFriends(
  session: Session,
  res: NextApiResponse<NetworkResult<CheckFriendsResponse>>,
  req: NextApiRequest
) {
  const searchKeyWord = req.query.search;
  try {
    const friends = await client.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        following: {
          where: {
            name: { contains: searchKeyWord ? (searchKeyWord as string) : "" },
          },
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

async function requestFriends(
  session: Session,
  res: NextApiResponse<
    NetworkResult<CheckFriendsResponse | CreateFriendResponse>
  >,
  req: NextApiRequest
) {
  const targetFriendId = req.body.userId;

  assert(targetFriendId !== null, "id is null");

  try {
    const existRequestArr = await client.requestFriendTransaction.findMany({
      where: {
        sender: session.user.id,
        receiver: targetFriendId,
      },
    });
    if (existRequestArr.length === 0) {
      await client.requestFriendTransaction.create<{
        data: {
          sender: string;
          receiver: string;
          status: RequestFriendStatus;
        };
      }>({
        data: {
          sender: session.user.id,
          receiver: targetFriendId,
          status: "Pending",
        },
      });

      res.status(200).json({
        status: "Success",
        message: "요청 완료",
      });
      return;
    }
    res.status(400).json({
      status: "Failed",
      message: "이미 요청한 친구입니다.",
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "DB Error",
    });
  }
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    NetworkResult<CheckFriendsResponse | CreateFriendResponse>
  >
) {
  const session = await getServerSession(req, res, authOptions);

  assert(session !== null, "session is null");
  if (req.method === "GET") {
    getFriends(session, res, req);
  }

  if (req.method === "POST") {
    requestFriends(session, res, req);
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
  isPrivate: true,
});
