import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import fauna from "../../../clients/fauna";
import { User } from "../../../entities/User";

type FaunaRes = {
  data: {
    data: User;
  }[];
};

type Data = {
  data?: {
    totalInvited: number;
    confirmed: number;
    unconfirmed: number;
    godmothers: number;
    godfathers: number;
    normal: number;
  };
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const faunaRes: FaunaRes = await fauna.query(
      q.Map(
        q.Paginate(q.Distinct(q.Documents(q.Collection("convidados"))), {
          size: 999,
        }),
        q.Lambda("ref", q.Get(q.Var("ref")))
      )
    );

    let totalInvited = 0;
    let confirmed = 0;
    let unconfirmed = 0;
    let godfathers = 0;
    let godmothers = 0;
    let normal = 0;

    faunaRes.data.forEach((member) => {
      totalInvited++;
      if (member.data.confirmed) confirmed++;
      else unconfirmed++;
      if (member.data.isGodfather) godfathers++;
      else if (member.data.isGodmother) godmothers++;
      else normal++;
    });

    return res.status(200).json({
      data: {
        totalInvited,
        confirmed,
        unconfirmed,
        godmothers,
        godfathers,
        normal,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }
}
