import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import fauna from "../../../clients/fauna";

type ListData = {
  email: string;
};

type FaunaRes = {
  data: {
    isAdmin: boolean;
    relation: string;
  };
};

type Data = {
  isAdmin?: boolean;
  relation?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email }: ListData = JSON.parse(req.body);

  if (!email) {
    return res.status(401).json({ error: "error" });
  }

  try {
    const faunaRes: FaunaRes = await fauna.query(
      q.Get(q.Match(q.Index("email"), email))
    );

    console.log(faunaRes);

    return res
      .status(200)
      .json({
        isAdmin: faunaRes.data.isAdmin,
        relation: faunaRes.data.relation,
      });
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }
}
