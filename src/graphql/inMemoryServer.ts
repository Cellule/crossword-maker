import { SchemaLink } from "@apollo/client/link/schema"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { resolvers } from "./resolvers"
import typeDefs from "./schema.graphql?raw"
import { LocalStorageDataSource } from "./types"

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const storage = new LocalStorageDataSource()

export const schemaLink = new SchemaLink({
  schema,
  context: {
    dataSources: {
      storage,
    },
  },
})
