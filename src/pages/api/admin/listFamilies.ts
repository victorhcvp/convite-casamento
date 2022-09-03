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
    data: {
      relation: string;
    };
  }[];
};

type Data = {
  data?: string[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { password }: ListData = req.body;

  if (!password || password !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: "invalid password" });
  }

  try {
    const faunaRes: FaunaRes = await fauna.query(
      q.Map(
        q.Paginate(q.Distinct(q.Documents(q.Collection("convidados"))), {
          size: 999,
        }),
        q.Lambda("ref", q.Get(q.Var("ref")))
      )
    );

    console.log(faunaRes);

    const relations = faunaRes.data.map((user) => {
      return user.data.relation;
    });

    const uniqueArray = relations.filter(function (elem, pos) {
      return relations.indexOf(elem) == pos;
    });

    return res.status(200).json({ data: uniqueArray });
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }
}
