import { addMockFunctionsToSchema } from 'graphql-tools';
// import mocks from './mocks';
import resolvers from "./resolvers";

const typeDefs = `
  type Query {
    author(firstName: String, lastName: String): Author
    allAuthors: [Author]
    posts: [Post]
    getFortuneCookie: String # we'll use this later
  }
  type Author {
    id: Int
    firstName: String
    lastName: String
    posts: [Post]
  }
  type Post {
    id: Int
    title: String
    text: String
    votes: Int
    author: Author
  }
  type Mutation {
    upvotePost (
      postId: Int!,
      inVote: Int
    ): Post
  }
`;

const schema = { typeDefs, resolvers };

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
