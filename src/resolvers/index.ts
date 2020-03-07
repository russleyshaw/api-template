import { Resolvers } from "../generated/graphql";
import QueryResolver from "./query";
import AuthorResolver from "./author";

export const resolver: Resolvers = {
    Query: QueryResolver,
    Author: AuthorResolver
};
