import express from "express";
import graphqlHTTP from "express-graphql";
import { PORT, SCHEMA_FILE } from "./vars";
import logger from "./logger";
import * as fs from "fs";
import { makeExecutableSchema, IResolvers } from "graphql-tools";
import { resolver } from "./resolvers/index";
import * as middleware from "./middleware";

const schema = makeExecutableSchema({
    typeDefs: fs.readFileSync(SCHEMA_FILE, "utf8"),
    resolvers: resolver as IResolvers
});

const app = express();

app.use(middleware.logging);

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.use(middleware.error);

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}...`, { port: PORT });
});
