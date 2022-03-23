import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { config } from './config/config'
import Logging from './library/Logging'
import {applyMiddleware} from 'graphql-middleware'
import {ApolloServer, gql} from 'apollo-server'
import typeDefs from './schema'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import {RegisterResult, LoginResult } from './resolvers/Auth'
import {makeExecutableSchema} from '@graphql-tools/schema'

/** First try to connect to mongo */
mongoose.connect(config.mongo.url)
.then(() => {
    Logging.info('Connected to Meal Prep App db')
    startServer()
})
.catch((error) => {
    Logging.error('Unable to connect to Meal Prep App db:' )
    Logging.error(error)
})



const startServer = ():void => {
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
        RegisterResult, LoginResult
    };

    if (config.server.env === 'dev') {
        const schema = makeExecutableSchema({
            typeDefs, 
            resolvers
        })
        const loggingMiddleware = async(resolve: any, root: any, args: any, context: any, info: any) => {
            const result = await resolve(root, args, context, info)
            Logging.info(`Successfully hit endpoint. Request type: ${info.path.typename} | Request name: ${info.path.key} `);
            return result
        }
        const schemaWithMiddleware = applyMiddleware(schema, loggingMiddleware)
        app = new ApolloServer({schema: schemaWithMiddleware});
    } else {
        app = new ApolloServer({
            typeDefs,
            resolvers
        });
    }
    

    app.listen().then(({url}) => {
        Logging.info(`Server is up at ${url}`);
    })

} 