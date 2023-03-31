// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import _ from "lodash";
import { CheckUnionsResponse, NetworkResult } from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import client from "@/libs/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkResult<CheckUnionsResponse>>
) {
  const session = await getServerSession(req, res, authOptions);
  const searchKeyWord = req.query.keyword as string;
  if (!searchKeyWord)
    return res.status(200).json({
      status: "Success",
      data: [],
    });

  assert(session !== null, "session is null");

  try {
    const hasMyUnion = await client.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (hasMyUnion?.unionId) {
      return res.status(400).json({
        status: "Failed",
        message: "이미 유니온에 소속했습니다. ",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      message: "DB error",
    });
  }

  try {
    const unions = await client.union.findMany({
      where: { name: { contains: searchKeyWord } },
    });

    res.status(200).json({
      status: "Success",
      data: unions,
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
