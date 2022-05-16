import faunadb from 'faunadb'

const fauna = new faunadb.Client({
  secret: process.env.FAUNA_API_KEY || '',
  domain: 'db.us.fauna.com',
})

export default fauna;