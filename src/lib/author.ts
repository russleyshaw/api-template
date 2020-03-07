import { Author } from "../generated/graphql";

const authors: Author[] = [
    { id: 1, firstName: "Russley", lastName: "Shaw" },
    { id: 2, firstName: "Keenen", lastName: "Salez" }
];

export function getAuthors(): Author[] {
    return authors;
}
