import { Post } from "../generated/graphql";
import { getAuthors } from "./author";

const posts: Post[] = [
    { author: getAuthors()[0], id: 1, title: "First Post" },
    { author: getAuthors()[1], id: 2, title: "Second Post" }
];

export function getPosts(): Post[] {
    return posts;
}
