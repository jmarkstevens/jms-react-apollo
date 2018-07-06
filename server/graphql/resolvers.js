import { Author, Post } from "./connectors";

const resolvers = {
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    allAuthors(_, args) {
      return Author.findAll();
    },
    posts(_, args) {
      return Post.findAll();
    }
  },
  Author: {
    posts(author) {
      return author.getPosts();
    }
  },
  Post: {
    author(post) {
      return post.getAuthor();
    }
  },
  Mutation: {
    async upvotePost(_, { postId, inVote }) {
      const rtrn = await Post.update({ votes: inVote }, { where: { id: postId }});
      return Post.findById(postId);
    },
  }
};

export default resolvers;
