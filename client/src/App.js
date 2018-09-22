import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import './App.css';
import WithLink from './components/withLink';
import WithGraphql from './components/withGraphql';
import WithQuery from './components/withQuery';
import WithApollo from './components/withApollo';
import WithState from './components/withState';
import WithStaticClient from "./components/withStaticClient";

const upvoteMutation = gql`
  mutation upvotePost($postId: Int!, $inVote: Int) {
    upvotePost(postId: $postId, inVote: $inVote) {
      id
      title
      votes
    }
  }
`;

class App extends Component {
  onUpvote = upvotePost => {
    const { mutate } = this.props;
    mutate({ variables: upvotePost });
  };
  render() {
    return (
      <div className="App">
        <WithState />
        <WithGraphql />
        <WithQuery />
        <WithApollo />
        <WithStaticClient />
        <WithLink />
      </div>
    );
  }
}

export default graphql(upvoteMutation)(App);
