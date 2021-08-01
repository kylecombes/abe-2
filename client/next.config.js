module.exports = {
  async rewrites() {
    return [
      {
        destination: 'http://localhost:5000/graphql',
        source: '/graphql',
      },
    ];
  },
};
