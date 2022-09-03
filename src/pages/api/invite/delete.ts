import type { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import fauna from "../../../clients/fauna";

type Data = {
  ok?: boolean;
  error?: string;
};

type DeleteData = {
  email: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password }: DeleteData = req.body;

  if (!password || password !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: "invalid password" });
  }

  if (!email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    fauna.query(
      q.Let(
        {
          match: q.Match(q.Index("email"), email),
        },
        q.If(
          q.Exists(q.Var("match")),
          q.Delete(q.Select("ref", q.Get(q.Var("match")))),
          null
        )
      )
    );
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }

  return res.status(200).json({ ok: true });
}
