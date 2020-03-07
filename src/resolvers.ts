import { Resolvers, QueryResolvers, Post, Author } from "./generated/graphql";
import { ReplaceInterfaceProp } from "./util";

const authors: Author[] = [
    { id: 1, firstName: "Russley", lastName: "Shaw" },
    { id: 2, firstName: "Keenen", lastName: "Salez" }
];

const posts: Post[] = [
    { author: authors[0], id: 1, title: "First Post" },
    { author: authors[1], id: 2, title: "Second Post" }
];

export const resolver: Resolvers = {
    Author: {
        posts(root, arg): Post[] {
            const { findTitle } = arg;

            let results = posts.filter(p => p.id === root.id);
            if (findTitle) {
                results = results.filter(p => p.title.toLowerCase() === findTitle.toLowerCase());
            }
            return results;
        }
    },
    Query: {
        posts(): Post[] {
            return posts;
        }
    }
};
