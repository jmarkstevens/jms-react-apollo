import React, { Component } from 'react';
import { Mutation, Query, withApollo } from "react-apollo";
import { postsQuery, upvoteMutation, upvotedMutation } from "../qraphql/gql";

const UpVote = ({ post, doUpvoted }) => {
  return (
    <Mutation
      mutation={upvoteMutation}
      update={(cache, { data: { upvotePost } }) => {
        doUpvoted(upvotePost);
        cache.readQuery({ query: postsQuery });
      }}
    >
      {upVote => (
        <button
          onClick={() =>
            upVote({ variables: { postId: post.id, inVote: post.votes + 1 } })
          }
        >
          {" "}
          up vote
        </button>
      )}
    </Mutation>
  );
};

const GetQuery = ({ children, ...props }) => (
  <Query {...props}>
    {({ loading, error, data }) => {
      if (loading) { return 'loading' };
      if (error) return `Error!: ${error}`;
      return children(data);
    }}
  </Query>
)

const Posts = ({ doUpvoted }) => (
  <GetQuery query={postsQuery}>
    {data => {
      return (
        <ul>
          {data.posts.map((post, index) => {
            const key = index + 1;
            return (
              <li key={key}>
                <UpVote post={post} doUpvoted={doUpvoted} />&nbsp;
                {post.title} {post.author.lastName} with {post.votes} votes.
              </li>
            );
          })}
        </ul>
      );
    }}
  </GetQuery>
);

class WithQuery extends Component {
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
  };
  render() {
    return <div style={{ marginLeft: "20px", textAlign: "left" }}>
        <h2>WithQuery</h2>
      <Posts doUpvoted={this.doUpvoted} />
      </div>;
  }
}

export default withApollo(WithQuery);