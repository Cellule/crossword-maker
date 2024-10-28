import { ApolloClient, InMemoryCache } from "@apollo/client"
import { schemaLink } from "./inMemoryServer"

const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       puzzles: {
  //         merge: true,
  //       },
  //     },
  //   },
  //   Puzzle: {
  //     keyFields: ["id"],
  //     fields: {
  //       words: {
  //         merge: true,
  //       },
  //     },
  //   },
  // },
})

export const client = new ApolloClient({
  link: schemaLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
})
