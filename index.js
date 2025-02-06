import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// types
import { typeDefs } from "./schema.js";
import { games, authors, reviews } from "./db.js";

const resolvers = {
  Query: {
    games: () => games,
    reviews: () => reviews,
    authors: () => authors,
    review: (_, args) => reviews.find((review) => review.id === args.id),
    game: (_, args) => games.find((game) => game.id === args.id),
    author: (_, args) => authors.find((author) => author.id === args.id),
  },
  Game: {
    reviews: (parent) => {
      return reviews.filter((r) => r.gameId === parent.id);
    },
  },
  Author: {
    reviews: (parent) => {
      return reviews.filter((r) => r.authorId === parent.id);
    },
  },
  Review: {
    author: (parent) => {
      return authors.find((a) => a.id === parent.authorId);
    },
    game: (parent) => {
      return games.find((g) => g.id === parent.gameId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server is running at: ${url}`);
