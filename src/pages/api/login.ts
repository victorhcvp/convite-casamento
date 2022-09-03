// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fauna from "../../clients/fauna";
import { query as q } from "faunadb";
import { User } from "../../entities/User";

type Data = {
  logged: boolean;
  data?: User;
};

type InviteData = {
  data: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email } = JSON.parse(req.body);

  if (!email) {
    return res.status(401).json({ logged: false });
  }

  try {
    const faunaRes: InviteData = await fauna.query(
      q.Get(q.Match(q.Index("email"), email))
    );

    const { data } = faunaRes;

    if (faunaRes.data.id) {
      return res.status(200).json({ logged: true, data });
    }
  } catch (error) {}

  return res.status(401).json({ logged: false });
}
