import { Client } from 'faunadb'

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
  // domain: 'db.classic.fauna.com'
})