import React, { Component } from 'react';

import { postsQuery, upvoteMutation, upvotedMutation } from "../qraphql/gql";
import StaticClient from '../qraphql/staticClient';

const client = (new StaticClient()).client;

const doUpvoted = upvotedPost => {
  client
    .mutate({
      mutation: upvotedMutation,
      variables: { ...upvotedPost }
    })
    .then(() => {
      console.log("WithStaticCache upvotedPost then");
    })
    .catch(err => {
      console.log("catch", err);
    });
};

export default class WithStaticClient extends Component {
  state = { update: { id: 0, title: "", votes: 0 }, posts: [] };
  componentDidMount() {
    this.getPosts();
  }
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
        doUpvoted(upvotePost);
        this.getPosts();
      })
      .catch(err => {
        console.log("catch", err);
      });
  };
  getPosts0 = () => {
    const observableQuery = client.watchQuery({
      query: postsQuery,
      pollInterval: 15000
    });
    observableQuery.subscribe({
      next: ({ data }) => this.setState({ posts: data.posts })
    });
  };
  getPosts = () => {
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
    console.log("WithStaticClient props:", this.props);
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
        <h2>WithStaticClient</h2>
        <ul>{list}</ul>
      </div>
    );
  }
}
