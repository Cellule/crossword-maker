import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "src/graphql/schema.graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: { unmaskFunctionName: "unmaskFragmentData" },
      },
    },
    "./src/graphql/generated/resolvers-types.ts": {
      plugins: [
        {
          add: {
            content: "import * as GQLGen from './graphql'",
          },
        },
        {
          "typescript-resolvers": {
            mappers: {
              Puzzle: "../types#GQLPuzzle",
              PlacedWord: "../types#GQLPlacedWord",
              Word: "../types#GQLWord",
            },
          },
        },
      ],
      config: {
        useIndexSignature: true,
        contextType: "../types#GraphQLContext",
        enumsAsTypes: true,
        namespacedImportName: "GQLGen",
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
