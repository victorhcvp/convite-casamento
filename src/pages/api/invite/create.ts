import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { query as q } from 'faunadb'
import fauna from '../../../clients/fauna'

type Data = {
  ok?: boolean;
  error?: string;
}

type FaunaGet = {
  ref: any;
  data: CreateData;
}

type CreateData = {
  name: string;
  phone: string;
  email: string;
  isGodfather: boolean;
  isGodmother: boolean;
  relation: string;
  password: string;
  confirmed: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    name, 
    phone, 
    email, 
    isGodfather, 
    isGodmother,
    relation, 
    password,
    confirmed,
  }:CreateData = req.body;

  if(!password || password !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'invalid password' });
  }

  if(!name || 
    isGodfather === undefined ||
    isGodmother === undefined ||
    !relation) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  
  const id = uuidv4();

  const data = {
    id,
    name,
    phone,
    email,
    isGodfather,
    isGodmother,
    relation,
    confirmed: confirmed || false,
  }
  
  try {
    fauna.query(
      q.Let(
        {
          match: q.Match(q.Index('phone'), phone),
          data: { data }
        },
        q.If(
          q.Exists(q.Var('match')),
          q.Update(q.Select('ref', q.Get(q.Var('match'))), q.Var('data')),
          q.Create(q.Collection('convidados'), q.Var('data'))
        )
      )
    );
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }

  return res.status(200).json({ ok: true })
}
