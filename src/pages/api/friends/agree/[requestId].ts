// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NetworkResult } from "@/interface/network";
import client from "@/libs/client";
import { acceptRequestFriend } from "@/libs/server/friend";
import withHandler from "@/libs/server/withHandler";
import assert from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<null>>
) {
  const session = await getServerSession(req, res, authOptions);
  const responseCondition = req.query.condition;

  if (!responseCondition)
    return res.status(400).json({
      status: "Failed",
      message: "수락/거절을 결정해주세요",
    });

  assert(session !== null, "session is null");

  try {
    const myInvitation = await client.requestFriendTransaction.findUnique({
      where: {
        id: req.query.requestId as string,
      },
    });
    assert(myInvitation !== null, "myInvitation is null");

    if (
      myInvitation.status === "Pending" &&
      myInvitation.sender === session.user.id
    ) {
      res.status(400).json({
        status: "Failed",
        message: "내가 보낸 초대입니다.",
      });
      return;
    }

    if (
      myInvitation.status === "Accepted" ||
      myInvitation.status === "Rejected"
    ) {
      res.status(400).json({
        status: "Failed",
        message: "이미 처리된 요청입니다.",
      });
    }

    if (
      myInvitation.status === "Pending" &&
      myInvitation.sender !== session.user.id
    ) {
      if (responseCondition === "Accepted") {
        acceptRequestFriend(session.user.id, myInvitation.sender);
      }
      await client.requestFriendTransaction.update({
        where: {
          id: req.query.requestId as string,
        },
        data: {
          status: responseCondition as string,
        },
      });
    }

    res.status(200).json({
      status: "Success",
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
