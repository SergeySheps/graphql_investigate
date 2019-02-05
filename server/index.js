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
    schema: schema,
    formatError: err => {
      console.log(err, 'err')
      return {message: err.message, statusCode: 401}
    }
  })
)
// app.get(
//   '/graphql',
//   graphqlHTTP(req => {
//     // console.log(req,"req")
//     return {
//       schema: schema,
//       graphiql: true
//     }
//   })
// )

const server = app.listen(4000, function() {
  console.log('Server listening on port ' + 4000)
})
