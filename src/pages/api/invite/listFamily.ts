import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import fauna from "../../../clients/fauna";
import { User } from "../../../entities/User";

type ListData = {
  relation: string;
  password: string;
};

type FaunaRes = {
  data: {
    data: User;
  }[];
};

type Data = {
  data?: User[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { relation, password }: ListData = req.body.relation
    ? req.body
    : JSON.parse(req.body);

  if (!password || password !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: "invalid password" });
  }

  if (!relation) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const faunaRes: FaunaRes = await fauna.query(
      q.Map(
        q.Paginate(q.Match(q.Index("relation"), relation)),
        q.Lambda("ref", q.Get(q.Var("ref")))
      )
    );

    const users = faunaRes.data.map((user) => {
      return user.data;
    });

    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }
}
