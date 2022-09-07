import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { query as q } from "faunadb";
import fauna from "../../../clients/fauna";

type Data = {
  ok?: boolean;
  error?: string;
};

type FaunaGet = {
  ref: any;
  data: CreateData;
};

type CreateData = {
  id?: string;
  name: string;
  phone: string;
  email: string;
  isGodfather: boolean;
  isGodmother: boolean;
  isHonor: boolean;
  relation: string;
  password: string;
  confirmed: boolean;
  isAdmin: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    id,
    name,
    phone,
    email,
    isGodfather,
    isGodmother,
    isHonor,
    relation,
    password,
    confirmed,
    isAdmin,
  }: CreateData = req.body.name ? req.body : JSON.parse(req.body);

  if (!password || password !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: "invalid password" });
  }

  // await new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("ok");
  //   }, 2000);
  // });

  if (
    !name ||
    isGodfather === undefined ||
    isGodmother === undefined ||
    isHonor === undefined ||
    isAdmin === undefined ||
    !relation
  ) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const data = {
    id: id || uuidv4(),
    name,
    phone,
    email,
    isGodfather,
    isGodmother,
    isHonor,
    relation,
    confirmed: confirmed || false,
    isAdmin,
  };

  try {
    fauna.query(
      q.Let(
        {
          match: q.Match(q.Index("email"), email),
          data: { data },
        },
        q.If(
          q.Exists(q.Var("match")),
          q.Update(q.Select("ref", q.Get(q.Var("match"))), q.Var("data")),
          q.Create(q.Collection("convidados"), q.Var("data"))
        )
      )
    );
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }

  return res.status(200).json({ ok: true });
}
