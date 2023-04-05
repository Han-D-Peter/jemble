// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import assert from "assert";
import {
  CheckUnionsResponse,
  CreateUnionRespnse,
  NetworkResult,
} from "@/interface/network";
import withHandler from "@/libs/server/withHandler";
import { authOptions } from "../auth/[...nextauth]";
import {
  createUnion,
  getUnionByMyId,
  getUnionByName,
  getUnions,
} from "@/libs/server/union";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    NetworkResult<CreateUnionRespnse | CheckUnionsResponse | any[]>
  >
) {
  const body: { name: string; union_image: string } = req.body;

  const session = await getServerSession(req, res, authOptions);

  assert(session !== null, "session is null");

  if (req.method === "GET") {
    const unions = await getUnions({ orderBy: "Higher" });
    return res.status(200).json({
      status: "Success",
      data: unions,
    });
  }

  if (req.method === "POST") {
    if (!req.body.name) {
      return res.status(400).json({
        status: "Failed",
        message: "유니온의 이름을 입력해주세요.",
      });
    }
    const existedUnionByName = await getUnionByName(req.body.name);

    if (existedUnionByName) {
      return res.status(400).json({
        status: "Failed",
        message: "같은 이름의 유니온이 존재합니다.",
      });
    }

    const myUnion = await getUnionByMyId(session.user.id);

    if (myUnion) {
      return res.status(400).json({
        status: "Failed",
        message: "가입한 유니온이 이미 존재합니다.",
      });
    }

    const newUnion = await createUnion(session.user.id, body);

    if (newUnion) {
      res.status(200).json({
        status: "Success",
        data: newUnion,
      });
      return;
    }

    if (!newUnion) {
      res.status(400).json({
        status: "Failed",
        message: "유니온을 생성할 수 없습니다",
      });
    }
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
  isPrivate: true,
});
