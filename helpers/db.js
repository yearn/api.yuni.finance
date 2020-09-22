var pgp = require('pg-promise')(/*options*/)
require('dotenv').config()

var cn = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}
var db = pgp(cn)

module.exports = {
  pgp, db
}
