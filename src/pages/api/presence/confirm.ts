import type { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import fauna from "../../../clients/fauna";

type Data = {
  ok?: boolean;
  error?: string;
};

type ConfirmPresenceData = {
  email: string;
  confirmed: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, confirmed }: ConfirmPresenceData = req.body;

  if (!email || confirmed === undefined) {
    return res.status(401).json({ error: "Missing fields" });
  }

  const data = {
    confirmed,
  };

  try {
    fauna.query(
      q.Let(
        {
          match: q.Match(q.Index("email"), email),
          data: { data },
        },
        q.Update(q.Select("ref", q.Get(q.Var("match"))), q.Var("data"))
      )
    );
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }

  return res.status(200).json({ ok: true });
}
