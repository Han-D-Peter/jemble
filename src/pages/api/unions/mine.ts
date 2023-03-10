// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Union } from "@/interface/model/union";
import { NetworkResult } from "@/interface/network";
import { getUnionById } from "@/libs/server/union";
import withHandler from "@/libs/server/withHandler";
import assert from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface CheckMyUnionResponse {
  union: Union;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckMyUnionResponse>>
) {
  const session = await getServerSession(req, res, authOptions);

  assert(session !== null, "session is null");

  const union = await getUnionById(session.user.id);

  if (union) {
    return res.status(200).json({
      status: "Success",
      data: union,
    });
  }

  return res.status(404).json({
    status: "Failed",
    message: "소속된 유니온이 없습니다.",
  });
}

export default withHandler({
  methods: ["GET"],
  handler,
  isPrivate: true,
});
