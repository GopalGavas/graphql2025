export const typeDefs = `#graphql
# Data types: Int, Float, String, Boolean, ID
# Having an '!' marks means that attribute or type is required
# Query type is something every graphql schema must have and it is not optional
# Its  job is to defined the entrypoints and return type of the entrypoints
type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
}

type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
}

type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
}

type Query {
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
}

type Mutation {
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    updateGame(id: ID!, edits: EditGameInput!): Game
}

input AddGameInput {
    title: String!
    platform: [String!]!
}

input EditGameInput {
    title: String,
    platform: [String!]!
}
`;
