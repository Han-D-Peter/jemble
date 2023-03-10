import { Union } from "@/api/server/generated";
import client from "../client";

export async function isExistedUnionByName(name: string): Promise<boolean> {
  try {
    const existedUnionByName = await client.union.findUnique({
      where: {
        name,
      },
    });
    if (existedUnionByName) return true;
    if (!existedUnionByName) return false;
  } catch (e) {
    console.log("error", e);
    return true;
  }
  return true;
}

export async function getUnionByName(name: string) {
  try {
    const existedUnionByName = await client.union.findUnique({
      where: {
        name,
      },
    });
    if (existedUnionByName) return existedUnionByName;
    if (!existedUnionByName) return null;
  } catch (e) {
    console.log("error", e);
    return null;
  }
}

export async function getUnions() {
  try {
    const unions = await client.union.findMany({});
    return unions;
  } catch (e) {
    console.log("error", e);
    return [];
  }
}

export async function getUnionById(myId: string) {
  try {
    const myUnion = await client.union.findFirst({
      where: {
        user: {
          every: {
            id: myId,
          },
        },
      },
    });
    if (myUnion) return myUnion;
    if (!myUnion) return null;
  } catch (e) {
    console.log("error", e);
    return null;
  }
}

export async function createUnion(
  myId: string,
  data: { name: string; union_image: string } = {
    name: "unknown",
    union_image: "",
  }
) {
  try {
    const union = await client.union.create({
      data: {
        ...data,
        user: {
          connect: {
            id: myId,
          },
        },
      },
    });
    return union;
  } catch (e) {
    console.log("error", e);
    return null;
  }
}
