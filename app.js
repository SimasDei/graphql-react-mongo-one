const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');

const graphQlSchema = require('./graphQl/schema/index');
const graphQlResolvers = require('./graphQl/resolvers/index');

const app = express();
// Parse http requests
app.use(bodyParser.json());
// Middleware, Valid Express syntax used
app.use(isAuth);

// Setup graphql, location of schemas Resolvers
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@graphql-react-mongo-one-pggfz.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connection to DB established, Captain o/');
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
