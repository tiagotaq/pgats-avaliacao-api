const app = require('./app');

const PORT = process.env.GRAPHQL_PORT || 4000;
app.listen(PORT, () => {
  console.log(`API GraphQL rodando em http://localhost:${PORT}/graphql`);
});
