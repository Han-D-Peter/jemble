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

type UnionOrderBy = "Higher" | "Lower";

export async function getUnions({
  orderBy = "Higher",
}: {
  orderBy?: UnionOrderBy;
}) {
  if (orderBy === "Higher") {
    try {
      const unions = await client.union.findMany({
        orderBy: [
          {
            points: "desc",
          },
        ],
      });
      return unions;
    } catch (e) {
      console.log("error", e);
      return [];
    }
  }
  if (orderBy === "Lower") {
    try {
      const unions = await client.union.findMany({
        orderBy: [
          {
            points: "asc",
          },
        ],
      });
      return unions;
    } catch (e) {
      console.log("error", e);
      return [];
    }
  }
  if (!orderBy) {
    try {
      const unions = await client.union.findMany({});
      return unions;
    } catch (e) {
      console.log("error", e);
      return [];
    }
  }
}

export async function getUnionByMyId(myId: string) {
  try {
    const myUnion = await client.union.findFirst({
      where: {
        user: {
          some: {
            id: myId,
          },
        },
      },
      include: {
        user: {
          orderBy: [
            {
              points: "desc",
            },
          ],
        },
      },
    });

    const unions = await client.union.findMany({
      orderBy: {
        points: "desc",
      },
    });

    const rank = unions.findIndex((union) => union.name === myUnion.name);
    if (myUnion) return { ...myUnion, rank };
    if (!myUnion) return null;
  } catch (e) {
    console.log("error", e);
    return null;
  }
}

export async function getUnionById(unionId: string) {
  try {
    const union = await client.union.findFirst({
      where: {
        id: unionId,
      },
    });
    if (union) return union;
    if (!union) return null;
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

export async function joinUnion(myId: string, unionName: string) {
  try {
    const union = await client.union.update({
      where: {
        name: unionName,
      },
      data: {
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

export async function getUnionName(unionId: string) {
  try {
    const union = await client.union.findFirst({
      where: {
        id: unionId,
      },
    });
    if (!union) return "";
    if (!union.name) return "";
    return union.name;
  } catch (e) {
    console.log("error", e);
    return "";
  }
}
