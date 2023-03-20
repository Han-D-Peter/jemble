// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import { authOptions } from "../../auth/[...nextauth]";
import {
  CheckUnionRankResponse,
  NetworkResult,
  UnionWithRank,
} from "@/interface/network";
import { getUnions } from "@/libs/server/union";
import withHandler from "@/libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckUnionRankResponse>>
) {
  const session = await getServerSession(req, res, authOptions);
  const unionName = req.query.unionName as string;

  assert(session !== null, "session is null");

  const unions = await getUnions({ orderBy: "Higher" });
  if (!unions)
    return res.status(404).json({
      status: "Failed",
      message: "유니온들을 찾을 수 없습니다.",
    });

  const rankedUnions: UnionWithRank[] = unions.map((union, index) => {
    return {
      rank: index + 1,
      ...union,
    };
  });

  const selectUnionByName = rankedUnions.find(
    union => union.name === unionName
  );

  if (!selectUnionByName)
    return res
      .status(404)
      .json({ status: "Success", message: "유니온 정보가 없습니다." });

  return res.status(200).json({ status: "Success", data: selectUnionByName });
}

export default withHandler({
  methods: ["GET"],
  handler,
  isPrivate: true,
});
