import React, { useState } from "react";
import { Icon, Button, Confirm } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

function DeleteButton(props) {
    const {postId, callback} = props
    const [confirmOpen, setConfirmOpen] = useState(false)

    const [deletePost] = useMutation(DELETE_POST, {
        update() {
            setConfirmOpen(false)
            // TODO remove post from cache
            if(callback) callback()
        },
        variables: {
            postId
        }
    })

  return (
      <>
    <Button
      as="div"
      color="red"
      onClick={() => setConfirmOpen(true)}
      floated="right"
    >
      <Icon name={"trash"} style={{ margin: 0 }} />
    </Button>
    <Confirm
        open={confirmOpen} 
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
    />
    </>
  );
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

export default DeleteButton