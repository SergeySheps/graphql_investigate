const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean
} = require('graphql')

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

const UserData = new GraphQLObjectType({
  name: 'UserData',
  fields: () => ({
    street: {type: new GraphQLNonNull(GraphQLString)},
    houseNumber: {type: new GraphQLNonNull(GraphQLInt)},
    apartmentNumber: {type: new GraphQLNonNull(GraphQLInt)},
    tel: {type: new GraphQLNonNull(GraphQLInt)}
  })
})

const DeleteOrder = new GraphQLObjectType({
  name: 'DeleteOrder',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    creationDate: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    isCompleted: {type: new GraphQLNonNull(GraphQLBoolean)},
    isInProgress: {type: new GraphQLNonNull(GraphQLBoolean)},
    orderAcceptor: {type: new GraphQLNonNull(GraphQLString)},
    totalPrice: {type: new GraphQLNonNull(GraphQLInt)},
    userData: {type: new GraphQLNonNull(UserData)}
  })
})

const SaveFinishTime = new GraphQLObjectType({
  name: 'SaveFinishTime',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    finishTime: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    startTime: {type: new GraphQLNonNull(GraphQLString)},
    todaysDate: {type: new GraphQLNonNull(GraphQLString)},
    timeSinceStartWork: {type: new GraphQLNonNull(GraphQLInt)},
  })
})

module.exports = {
  Products,
  Login,
  PizzasPaginate,
  Pizzas,
  DeleteOrder,
  SaveFinishTime
}
