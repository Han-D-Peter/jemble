import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  isPrivate = false,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    const session = await getServerSession(req, res, authOptions);
    if (req.method && methods.includes(req.method as any)) {
      return res.status(405).end();
    }

    if (isPrivate && !session) {
      return res.status(401).json({ ok: false, error: "Please Log In" });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
