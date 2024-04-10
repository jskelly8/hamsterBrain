const express = require('express');
const { ApolloServer } = require('@apollo/server');
/* gql */
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cors = require('cors');

const PORT = process.env.PORT || 5174;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => authMiddleware(req) 
});

const startApolloServer = async () => {
    await server.start();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));
    
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
 
        console.log('Process.NODE')

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    console.log('Check3')

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Apollo server live at port ${PORT}!`);
            console.log(`GraphQL available at http://localhost:${PORT}/graphql`)
        });
    });
};

startApolloServer()