import React, { useContext } from "react";
import { Grid, Image, Card } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";
import { AuthContext } from "./../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;

  const { data, loading, error } = useQuery(FETCH_POST_QUERY, {
    variables: { postId }
  });

  function deletePostCallback() {
      props.history.push('/')
  }

  //let postMarkup;

  // if (!data.getPost) {
  //     postMarkup = <p>Loading post...</p>
  // } else if (data && data.getPost) {
  //     //const { id, body, createdAt, username, likeCount, likes, commentCount, comments } = data.getPost

  //     postMarkup = <Grid>
  //         <Grid.Row>
  //             <Grid.Column width='2'>
  //                 <Image
  //                     floated='right'
  //                     size='mini'
  //                     src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
  //                 />
  //                 <Grid.Column width='10' />
  //             </Grid.Column>
  //         </Grid.Row>
  //     </Grid>
  // }

  //console.log(loading)
  // const { id, body, createdAt, username, likeCount, likes, commentCount, comments } = data.getPost
  return !loading && data && data.getPost
    ? <Grid>
        <Grid.Row>
          <Grid.Column width="2">
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
          </Grid.Column>
          <Grid.Column width="10">
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  {data.getPost.username}
                </Card.Header>
                <Card.Meta>
                  {moment(data.getPost.createdAt).fromNow()}
                </Card.Meta>
                <Card.Description>
                  {data.getPost.body}
                </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
                  post={{
                    likes: data.getPost.likes,
                    likeCount: data.getPost.likeCount,
                    id: data.getPost.id
                  }}
                  user={user}
                />
                {data &&
                  user &&
                  user.username === data.getPost.username &&
                  <DeleteButton postId={data.getPost.id} callback={deletePostCallback} />}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    : <p>Loading post...</p>;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
