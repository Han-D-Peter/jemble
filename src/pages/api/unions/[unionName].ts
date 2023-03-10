// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Union } from "@/interface/model/union";
import { NetworkResult } from "@/interface/network";
import { getUnionById, getUnionByName } from "@/libs/server/union";
import withHandler from "@/libs/server/withHandler";
import assert from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface CheckUnionResponse {
  union: Union;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckUnionResponse>>
) {
  const session = await getServerSession(req, res, authOptions);
  const unionId = req.query.id as string;

  assert(session !== null, "session is null");

  const union = await getUnionByName(unionId);

  if (union) {
    return res.status(200).json({
      status: "Success",
      data: union,
    });
  }

  return res.status(404).json({
    status: "Failed",
    message: "해당 유니온은 존재하지 않습니다",
  });
}

export default withHandler({
  methods: ["GET"],
  handler,
  isPrivate: true,
});
