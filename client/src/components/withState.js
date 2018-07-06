import React, { Component } from 'react';
import { graphql } from "react-apollo";
import { getUpvotedPost } from '../qraphql/gql';

class WithState extends Component {
  render() {
    console.log("WithState props:", this.props);
    let { id, title, votes, author } = { id: 0, title: "default", votes: 0, author: { lastName: '' } };
    if (this.props.data.upvotedPost) {
      const { upvotedPost } = this.props.data;
      ({ id, title, votes, author } = upvotedPost);
    }
    return (
      <div style={{ marginLeft: "20px", textAlign: "left" }}>
        <h3>Most recent upvote</h3>
        <p>
          id: {id}
          <br />
          title: {title} {author.lastName}
          <br />
          votes: {votes}
        </p>
      </div>
    );
  }
}

export default graphql(getUpvotedPost)(WithState);
