const {GraphQLInt, GraphQLObjectType, GraphQLSchema} = require('graphql')

const pizzaServices = require('../services/pizzaServices')
const userServices = require('../services/userServices')
const employeeServices = require('../services/employeeServices')
const verifyToken = require('../helpers/verifyTokenGraphql')
const {
  Products,
  Login,
  PizzasPaginate,
  DeleteOrder,
  SaveFinishTime
} = require('./customTypes')

const BlogQueryRootType = new GraphQLObjectType({
  name: 'BlogAppSchema',
  description: 'Blog Application Schema Query Root',
  fields: () => ({
    pizzas: {
      type: PizzasPaginate,
      args: {numPage: {type: GraphQLInt}},
      resolve: async (parent, args) => {
        try {
          return await pizzaServices.getPizzaProducts(args.numPage)
        } catch (error) {
          throw new Error(error.message)
        }
      }
    },
    login: {
      type: Login,
      resolve: async (parent, args, req) => {
        try {
          const user = await userServices.login(req.body)
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
    },
    deleteOrder: {
      type: DeleteOrder,
      resolve: async (parent, args, req) => {
        try {
          verifyToken(req)
          return await employeeServices.deleteOrderFromQueue(req.body)
        } catch (error) {
          throw new Error(error.message)
        }
      }
    },
    saveFinishTime: {
      type: SaveFinishTime,
      resolve: async (parent, args, req) => {
        try {
          verifyToken(req)
          return await employeeServices.saveFinishTime(req.body)
        } catch (error) {
          throw new Error(error.message)
        }
      }
    }
  })
})

const BlogAppSchema = new GraphQLSchema({
  query: BlogQueryRootType
})

module.exports = BlogAppSchema
