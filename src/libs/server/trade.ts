import { NextApiResponse } from "next";
import assert from "assert";
import { NetworkResult } from "@/interface/network";
import { DonationMutationResponse } from "@/pages/api/trade/union";
import { TransferMutationResponse } from "@/pages/api/trade/user";
import client from "../client";
import { getUser } from "./friend";
import { getUnionById } from "./union";

export async function transferUser(
  from: string,
  to: string,
  amount: number,
  res: NextApiResponse<NetworkResult<TransferMutationResponse>>
) {
  const me = await getUser(from);
  assert(me !== null, "Me is null");
  const targetUser = await getUser(to);

  if (me.points < amount)
    return res.status(400).json({
      status: "Failed",
      message: "송신에 필요한 포인트가 모자릅니다.",
    });
  if (!targetUser)
    return res
      .status(404)
      .json({ status: "Failed", message: "상대방의 정보가 없습니다." });

  try {
    const updatedMe = await client.user.update({
      where: {
        id: from,
      },
      data: {
        points: me.points - amount,
      },
    });
    const updatedTarget = await client.user.update({
      where: {
        id: to,
      },
      data: {
        points: targetUser.points + amount,
      },
    });
    return res.status(200).json({
      status: "Success",
      data: {
        me: updatedMe,
        friend: updatedTarget,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "Failed", message: "DB 오류 입니다." });
  }
}

export async function transferUnion(
  from: string,
  to: string,
  amount: number,
  res: NextApiResponse<NetworkResult<DonationMutationResponse>>
) {
  const me = await getUser(from);
  assert(me !== null, "Me is null");
  const targetUnion = await getUnionById(to);

  if (me.points < amount)
    return res.status(400).json({
      status: "Failed",
      message: "송신에 필요한 포인트가 모자릅니다.",
    });
  if (!targetUnion)
    return res
      .status(404)
      .json({ status: "Failed", message: "유니온의 정보가 없습니다." });

  try {
    const updatedMe = await client.user.update({
      where: {
        id: from,
      },
      data: {
        points: me.points - amount,
      },
    });
    const updatedTarget = await client.union.update({
      where: {
        id: to,
      },
      data: {
        points: targetUnion.points + amount,
      },
    });
    return res.status(200).json({
      status: "Success",
      data: {
        me: updatedMe,
        union: updatedTarget,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "Failed", message: "DB 오류 입니다." });
  }
}
