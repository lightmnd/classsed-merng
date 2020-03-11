import React from 'react';
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({ post: { id, body, createdAt, username, comments, likes, likeCount, commentCount } }) {
	//const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = props.post;

	function likePost() {
		console.log('like!');
	}

	function commentOnPost() {
		console.log('new comment!');
	}

	return (
		<Card.Group>
			<Card>
				<Card.Content>
					<Image
						floated='right'
						size='mini'
						src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
					/>
					<Card.Header>{username}</Card.Header>
					<Card.Meta as={Link} to={`/posts/${id}`}>
						{moment(createdAt).fromNow()}
					</Card.Meta>
					<Card.Description>{body}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Button as='div' labelPosition='right' onClick={likePost}>
						<Button basic color='teal'>
							<Icon name='heart' />
						</Button>
						<Label basic color='teal' pointing='left'>
							{likeCount}
						</Label>
					</Button>
					<Button as='div' labelPosition='right' onClick={commentOnPost}>
						<Button basic color='blue'>
							<Icon name={likeCount != 1 ? 'comments' : 'comment'} />
						</Button>
						<Label basic color='blue' pointing='left'>
							{likeCount}
						</Label>
					</Button>
				</Card.Content>
			</Card>
		</Card.Group>
	);
}

export default PostCard;
