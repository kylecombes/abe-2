module.exports = {
  client: {
    includes: ['./api-utils/**', './graphql/**'],
    service: {
      localSchemaFile: './schema.json',
      name: 'ABE 2 GraphQL',
    },
  },
};
