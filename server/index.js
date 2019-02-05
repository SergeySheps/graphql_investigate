const express = require('express')
const router = require('./helpers/routerHelper')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const app = express()

const schema = require('./graphQL/schema')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/', router)
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    formatError: err => {
      return {message: err.message, statusCode: 401}
    }
  })
)

const server = app.listen(4000, function() {
  console.log('Server listening on port ' + 4000)
})
