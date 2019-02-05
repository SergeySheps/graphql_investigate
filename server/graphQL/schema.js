const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLSchema
} = require('graphql')

const pizzaServices = require('../services/pizzaServices')
const userServices = require('../services/userServices')

const Pizzas = new GraphQLObjectType({
  name: 'Pizzas',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    type: {type: new GraphQLNonNull(GraphQLString)},
    image: {type: new GraphQLNonNull(GraphQLString)},
    composition: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)}
  })
})

const PizzasPaginate = new GraphQLObjectType({
  name: 'PizzasPaginate',
  fields: () => ({
    pages: {type: new GraphQLNonNull(GraphQLInt)},
    docs: {type: new GraphQLList(Pizzas)}
  })
})

const Login = new GraphQLObjectType({
  name: 'Login',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    firstName: {type: new GraphQLNonNull(GraphQLString)},
    secondName: {type: new GraphQLNonNull(GraphQLString)},
    isEmployee: {type: new GraphQLNonNull(GraphQLBoolean)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    createdDate: {type: new GraphQLNonNull(GraphQLString)},
    token: {type: new GraphQLNonNull(GraphQLString)}
  })
})

const Products = new GraphQLList(
  new GraphQLObjectType({
    name: 'Products',
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLString)},
      image: {type: new GraphQLNonNull(GraphQLString)},
      name: {type: new GraphQLNonNull(GraphQLString)},
      type: {type: new GraphQLNonNull(GraphQLString)},
      price: {type: new GraphQLNonNull(GraphQLFloat)}
    })
  })
)

const BlogQueryRootType = new GraphQLObjectType({
  name: 'BlogAppSchema',
  description: 'Blog Application Schema Query Root',
  fields: () => ({
    pizzas: {
      type: PizzasPaginate,
      args: {numPage: {type: GraphQLInt}},
      resolve: async (parent, args) => {
        try {
          const pizzas = await pizzaServices.getPizzaProducts(args.numPage)
          return pizzas
        } catch (error) {
          return {errorMessage: error.message}
        }
      }
    },
    login: {
      type: Login,
      resolve: async (parent, args, req) => {
        console.log(req.body, 'data')
        try {
          const user = await userServices.login(req.body)
          console.log(user, 'user')
          if (user) {
            return user
          } else {
            throw new Error('Incorrect Email or password')
          }
        } catch (error) {
          throw new Error(error.message)
        }
      }
    },
    products: {
      type: Products,
      resolve: async () => {
        try {
          return await pizzaServices.getProducts()
        } catch (error) {
          throw new Error(error.message)
        }
      }
    }
  })
})

const BlogAppSchema = new GraphQLSchema({
  query: BlogQueryRootType
  /* Если вам понадобиться создать или 
       обновить данные, вы должны использовать
       мутации. 
       Мутации не будут изучены в этом посте.
       mutation: BlogMutationRootType
    */
})

module.exports = BlogAppSchema
