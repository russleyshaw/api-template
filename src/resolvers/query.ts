import { QueryResolvers, Post } from "../generated/graphql";
import { getPosts } from "../lib/post";

const queryResolvers: QueryResolvers = {
    posts(): Post[] {
        return getPosts();
    }
};

export default queryResolvers;
