export const resolvers = {
  Mutation: {
    setUpvotedPost: (_, upvotedPost, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: "Post", id: 0 });
      // console.log("resolvers upvotedPost id:", id);
      // console.log("resolvers upvotedPost upvotedPost:", upvotedPost);
      const data = { ...upvotedPost };
      cache.writeData({ id, data });
      return null;
    }
  }
};

export const defaults = {
  upvotedPost: { id: 0, title: "query", votes: 0, author: { lastName: "default", __typename: "Author" }, __typename: "Post" }
};

export const typeDefs = `
  type Mutation {
    setUpvotedPost(upvotedPost: Post!): null
  }
  type Query {
    upvotedPost: Post
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
`;
