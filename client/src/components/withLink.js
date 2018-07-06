import React, { Component } from 'react';
import { execute, makePromise } from "apollo-link";
import { HttpLink } from "apollo-link-http";

import { postsQuery, upvoteMutation } from "../qraphql/gql";

const uri = 'http://localhost:3000/graphql';
const link = new HttpLink({ uri });

export default class WithLink extends Component {
  state = { update: { id: 0, title: "", votes: 0 }, posts: [] };
  componentDidMount() {
    this.getPosts();
  }
  onMutate = post => {
    const newVote = post.votes + 1;
    const operation = {
      query: upvoteMutation,
      variables: {
        postId: post.id,
        inVote: newVote
      }
    };
    makePromise(execute(link, operation))
      .then(data => {
        const { upvotePost } = data.data;
        console.log('WithLink upvotePost:', upvotePost);
        this.setState({ update: upvotePost });
        this.getPosts();
      })
      .catch(error => console.log(`received error ${error}`));
  };
  getPosts = () => {
    const operation = { query: postsQuery };
    makePromise(execute(link, operation))
      .then(data => {
        const { posts } = data.data;
        this.setState({ posts });
      })
      .catch(error => console.log(`received error ${error}`));
  };
  render() {
    const list = this.state.posts.map((post, index) => {
      const key = index + 1;
      return (
        <li key={key}>
          <button onClick={() => this.onMutate(post)}> up vote</button>&nbsp;
          {post.title} {post.author.lastName} with {post.votes} votes.
        </li>
      );
    });
    const { id, title, votes } = this.state.update;
    return (
      <div style={{ marginLeft: "20px", textAlign: "left" }}>
        <h2>WithLink</h2>
        <button onClick={() => this.getPosts()}> Update</button>
        <ul>{list}</ul>
        <h3>Upvote</h3>
        <p>
          id: {id}
          <br />
          title: {title}
          <br />
          votes: {votes}
        </p>
      </div>
    );
  }
}
