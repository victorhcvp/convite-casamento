import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import fauna from "../../../../clients/fauna";

type FaunaRes = {
  data: {
    isAdmin: boolean;
  };
};

type Data = {
  member?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!id) {
    return res.status(401).json({ error: "missing ID" });
  }

  try {
    const faunaRes: FaunaRes = await fauna.query(
      q.Get(q.Match(q.Index("id"), id))
    );

    return res.status(200).json({ member: faunaRes.data });
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }
}
