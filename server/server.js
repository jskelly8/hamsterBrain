const express = require('express');
const { ApolloServer, } = require('@apollo/server');
/* gql */
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3002;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server));

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirnace, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Apollo server live at port ${PORT}!`);
            console.log(`GraphQL available at http://localhost:${PORT}/graphql`)
        });
    });
};

startApolloServer();