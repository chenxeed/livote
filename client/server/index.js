const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// require env variable
require('dotenv').config({
  path: '../.env'
})

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.json())

    server.get('/', async (req, res) => {
      const actualPage = '/index'
      app.render(req, res, actualPage)
    })

    server.get('/votes/update/:id', (req, res) => {
      const actualPage = '/votes/update'
      app.render(req, res, actualPage, {
        id: req.params.id
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(process.env.CLIENT_PORT, err => {
      if (err) throw err
      console.log(`> Ready on ${process.env.CLIENT_HOST} port ${process.env.CLIENT_PORT}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })