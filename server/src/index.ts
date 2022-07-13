import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import { applyMiddleware } from 'graphql-middleware';
import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './schema';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import { RegisterResult, LoginResult } from './resolvers/AuthResult';
import { makeExecutableSchema } from '@graphql-tools/schema';
import jwt from 'jsonwebtoken';
import authMiddleware from './middleware/AuthMiddleware';
import loggingMiddleware from './middleware/LoggingMiddleware';
/** First try to connect to mongo */
mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.info('Connected to Meal Prep App db');
        startServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect to Meal Prep App db:');
        Logging.error(error);
    });

const startServer = (): void => {
    // app.use(express.urlencoded({extended: true}))
    // app.use(express.json())

    // app.use((req, res, next) => {
    //     /** Middleware to log our API calls */
    //     Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
    //     next()
    // })

    let app;
    const resolvers = {
        Query,
        Mutation,
        RegisterResult,
        LoginResult
    };

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    if (config.server.env === 'DEV') {
        const schemaWithMiddleware = applyMiddleware(schema, loggingMiddleware, authMiddleware);
        app = new ApolloServer({
            schema: schemaWithMiddleware,
            context: ({ req }) => {
                const authorization = req.headers.authorization || '';
                return { authorization };
            }
        });
    } else if (config.server.env === 'PROD') {
        const schemaWithMiddleware = applyMiddleware(schema, authMiddleware);
        app = new ApolloServer({
            schema: schemaWithMiddleware,
            context: ({ req }) => {
                const authorization = req.headers.authorization || '';
                return { authorization };
            }
        });
    }

    if (config.server.env === 'DEV') {
        app?.listen().then(({ url }) => {
            Logging.info(`Server is up at ${url}`);
        });
    } else {
        app?.listen(config.server.port).then(({ url }) => {
            Logging.info(`Server is up at ${url}`);
        });
    }
};
