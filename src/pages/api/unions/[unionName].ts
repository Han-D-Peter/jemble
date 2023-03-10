// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import { getUnionById, getUnionByName, joinUnion } from "@/libs/server/union";
import { NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";
import { Union } from "@/interface/model/union";

interface CheckUnionResponse {
  union: Union;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckUnionResponse>>
) {
  const session = await getServerSession(req, res, authOptions);
  const unionName = req.query.unionName as string;

  assert(session !== null, "session is null");

  const union = await getUnionByName(unionName);
  if (req.method === "GET") {
    if (union)
      return res.status(200).json({
        status: "Success",
        data: union,
      });

    if (!union)
      return res.status(404).json({
        status: "Failed",
        message: "해당 유니온은 존재하지 않습니다",
      });
  }

  if (req.method === "POST") {
    const myUnion = await getUnionById(session.user.id);
    if (myUnion)
      return res
        .status(400)
        .json({ status: "Failed", message: "이미 가입한 유니온이 있습니다." });

    if (!union)
      return res
        .status(404)
        .json({ status: "Failed", message: "찾을 수 없는 유니온입니다." });
    const joinedUnion = await joinUnion(session.user.id, unionName);
    if (joinedUnion)
      return res.status(200).json({
        status: "Success",
        data: joinedUnion,
      });

    if (!joinedUnion)
      return res.status(404).json({
        status: "Failed",
        message: "가입에 실패했습니다",
      });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
  isPrivate: true,
});
