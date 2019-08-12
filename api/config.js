require('dotenv').config({
  path: '../.env'
})

const config = {
  SERVER_PORT: process.env.SERVER_PORT,
  CLIENT_HOST: process.env.CLIENT_HOST,
  CLIENT_PORT: process.env.CLIENT_PORT,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME
}

module.exports = config
