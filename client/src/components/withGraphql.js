import React, { Component } from 'react';
import { compose, graphql, withApollo } from "react-apollo";
import { postsQuery, upvoteMutation, upvotedMutation } from "../qraphql/gql";

class WithGraphql extends Component {
  state = { upvotePost: { id: 0, title: "", votes: 0 } };
  doUpvoted = upvotedPost => {
    this.props.client
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
  }
  onMutate = post => {
    const newVote = post.votes + 1;
    const { mutate } = this.props;
    mutate({
      variables: {
        postId: post.id,
        inVote: newVote
      }
    }).then(result => {
      const { upvotePost } = result.data;
      // console.log("WithGraphql upvoteMutation then upvotePost:", upvotePost);
      this.doUpvoted(upvotePost);
    });
  };
  render() {
    // console.log('WithGraphql props:', this.props);
    const {
      data: { loading, posts }
    } = this.props;
    if (loading) return null;
    const list = posts.map((post, index) => {
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
        <h2>WithGraphql</h2>
        <ul>{list}</ul>
      </div>
    );
  }
}

export default compose(
  graphql(postsQuery),
  graphql(upvoteMutation),
  withApollo
)(WithGraphql);
