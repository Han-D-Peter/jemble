// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import { CheckMyUnionResponse, NetworkResult } from "@/interface/network";
import { getUnionByMyId } from "@/libs/server/union";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckMyUnionResponse>>
) {
  const session = await getServerSession(req, res, authOptions);

  assert(session !== null, "session is null");

  const union = await getUnionByMyId(session.user.id);

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
