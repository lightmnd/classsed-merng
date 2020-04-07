import React, { useContext, useCallback } from 'react';
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from './../context/auth'
import LikeButton from './../components/LikeButton'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useDropzone } from "react-dropzone";
import { AVATAR_IMAGE_QUERY, UserAvatar } from './UserAvatar'
import DeleteButton from './../components/DeleteButton'

function PostCard({ post: { id, body, createdAt, username, comments, likes, likeCount, commentCount } }) {
	//const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = props.post;
	const { user } = useContext(AuthContext)

	const [uploadFile] = useMutation(UPLOAD_FILE, {
		refetchQueries: [{ query: AVATAR_IMAGE_QUERY }]
	});

	const onDrop = useCallback(
		([file]) => {
			console.log('=>>>> FILE', file)
			uploadFile({ variables: { file } });
		},
		[uploadFile]
	);

	// function onChange({
	// 	target: {
	// 		validity,
	// 		files: [file]
	// 	}
	// }) {
	// 	if (validity.valid) mutate({ variables: { file } })
	// }
	
	// function likePost() {
	// 	console.log('like!');
	// }

	// function commentOnPost() {
	// 	console.log('new comment!');
	// }

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<Card.Group>
			<Card>
				<Card.Content>
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						{isDragActive ? (
							<UserAvatar />
						) : (
							<UserAvatar />
							)}
					</div>
					{/* <Image
						floated='right'
						size='mini'
						src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
					/> */}
					
					<Card.Header>{username}</Card.Header>
					<Card.Meta as={Link} to={user != null ? `/posts/${id}` : '/login'}>
						{moment(createdAt).fromNow()}
					</Card.Meta>
					<Card.Description>{body}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<LikeButton
						post={{ likes, likeCount, id }} user={user}
					//likePost={likePost} likeCount={likeCount} id={id} user={user} likes={likes} 
					/>
					<Button labelPosition='right'
						//onClick={commentOnPost}
						as={Link}
						to={`/post/${id}`}
					>
						<Button basic color='blue'>
							<Icon name={commentCount === 1 ? 'comment' : 'comments'} />
						</Button>
						<Label basic color='blue' pointing='left'>
							{commentCount}
						</Label>
					</Button>
					{user && user.username === username && (
						<DeleteButton postId={id} />
					)}
				</Card.Content>
			</Card>
		</Card.Group>
	);
}

const UPLOAD_FILE = gql`
	mutation UploadFile($file: Upload!) {
		uploadFile(file: $file)
	}
`;

export default PostCard;
