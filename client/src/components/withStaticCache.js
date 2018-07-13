import React, { Component } from 'react';
import ApolloClient from "apollo-client";
// import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";

import Cache from "../qraphql/cache";
import { postsQuery, upvoteMutation, upvotedMutation } from "../qraphql/gql";

const uri = "http://localhost:3000/graphql";
// const graphqlLink = createHttpLink({ uri });

const cache = new Cache().cache;

const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri })
});

export default class WithStaticCache extends Component {
  state = { update: { id: 0, title: "", votes: 0 }, posts: [] };
  componentDidMount() {
    this.getPosts();
  }
  doUpvoted = upvotedPost => {
    client
      .mutate({
        mutation: upvotedMutation,
        variables: { ...upvotedPost }
      })
      .then(() => {
        // console.log("upvotedPost then");
      })
      .catch(err => {
        console.log("catch", err);
      });
  };
  onMutate = post => {
    const newVote = post.votes + 1;
    client
      .mutate({
        mutation: upvoteMutation,
        variables: {
          postId: post.id,
          inVote: newVote
        }
      })
      .then(data => {
        const { upvotePost } = data.data;
        this.doUpvoted(upvotePost);
        this.getPosts();
      })
      .catch(err => {
        console.log("catch", err);
      });
  };
  getPosts = () => {
    const observableQuery = client.watchQuery({
      query: postsQuery,
      pollInterval: 15000
    });
    observableQuery.subscribe({
      next: ({ data }) => this.setState({ posts: data.posts })
    });
  };
  getPosts0 = () => {
    client
      .query({
        query: postsQuery
      })
      .then(data => {
        const { posts } = data.data;
        this.setState({ posts });
      })
      .catch(err => {
        console.log("catch", err);
      });
  };
  render() {
    console.log("WithApollo props:", this.props);
    const list = this.state.posts.map((post, index) => {
      const key = index + 1;
      return (
        <li key={key}>
          <button onClick={() => this.onMutate(post)}> up vote</button>&nbsp;
          {post.title} {post.author.lastName} with {post.votes} votes.
        </li>
      );
    });
    return (
      <div style={{ marginLeft: "20px", textAlign: "left" }}>
        <h2>WithStaticCache</h2>
        <ul>{list}</ul>
      </div>
    );
  }
}
