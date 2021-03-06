const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const schema = require('./schema');
const connectMongo = require('./mongo-connector');



const start = async () => {
  // 3
  const mongo = await connectMongo();
  var app = express();
  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: {mongo}, // 4
    schema
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`);
  });
};

// 5
start();
