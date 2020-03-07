import { AuthorResolvers, Post } from "../generated/graphql";
import { getPosts } from "../lib/post";

const authorResolvers: AuthorResolvers = {
    posts(root, arg): Post[] {
        const { findTitle } = arg;

        let results = getPosts().filter(p => p.id === root.id);
        if (findTitle) {
            results = results.filter(p => p.title.toLowerCase() === findTitle.toLowerCase());
        }
        return results;
    }
};

export default authorResolvers;
