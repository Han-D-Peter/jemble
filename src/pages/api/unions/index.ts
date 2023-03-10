// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Union as UnionModel } from "@/api/server/generated";
import { Union } from "@/interface/model/union";
import { User } from "@/interface/model/user";
import { NetworkResult } from "@/interface/network";
import client from "@/libs/client";
import {
  createUnion,
  getUnionById,
  getUnionByName,
  getUnions,
} from "@/libs/server/union";
import withHandler from "@/libs/server/withHandler";
import assert from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface CreateUnionRespnse {
  union: Union;
}

interface CheckUnionsResponse {
  unions: UnionModel[];
}

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
    const unions = await getUnions();
    return res.status(200).json({
      status: "Success",
      data: unions,
    });
  }

  if (req.method === "POST") {
    const existedUnionByName = await getUnionByName(req.body.name);

    if (existedUnionByName) {
      return res.status(400).json({
        status: "Failed",
        message: "같은 이름의 유니온이 존재합니다.",
      });
    }

    const myUnion = await getUnionById(session.user.id);

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