import React, { Component } from 'react';
import { withApollo } from "react-apollo";
import { postsQuery, upvoteMutation, upvotedMutation } from "../qraphql/gql";

class WithApollo extends Component {
  state = { update: { id: 0, title: "", votes: 0 }, posts: [] };
  componentDidMount() {
    this.getPosts();
  }
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
  };
  onMutate = post => {
    const newVote = post.votes + 1;
    this.props.client
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
    const observableQuery = this.props.client.watchQuery({
      query: postsQuery,
      pollInterval: 15000
    });
    observableQuery.subscribe({ next: ({ data }) => this.setState({ posts: data.posts }) });
  }
  getPosts0 = () => {
    this.props.client
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
        <h2>WithApollo</h2>
        {/* <button onClick={() => this.getPosts()}> Update</button> */}
        <ul>{list}</ul>
      </div>
    );
  }
}

export default withApollo(WithApollo);