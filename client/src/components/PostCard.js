import React, { useContext } from 'react';
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from './../context/auth'
import LikeButton from './../components/LikeButton'


function PostCard({ post: { id, body, createdAt, username, comments, likes, likeCount, commentCount } }) {
	//const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = props.post;

	const { user } = useContext(AuthContext)

	// function likePost() {
	// 	console.log('like!');
	// }

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
					<Card.Meta as={Link} to={user != null ? `/posts/${id}` : '/login'}>
						{moment(createdAt).fromNow()}
					</Card.Meta>
					<Card.Description>{body}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<LikeButton 
					post={{likes, likeCount, id}} user={user}
					//likePost={likePost} likeCount={likeCount} id={id} user={user} likes={likes} 
					/>
					<Button labelPosition='right'
						//onClick={commentOnPost}
						as={Link}
						to={`/post/${id}`}
					>
						<Button basic color='blue'>
							<Icon name={likeCount !== 1 ? 'comments' : 'comment'} />
						</Button>
						<Label basic color='blue' pointing='left'>
							{likeCount}
						</Label>
					</Button>
					{user && user.username === username && (
						<Button as='div' color='red' onClick={() => console.log('Delete post')} floated='right'>
							<Icon name={'trash'} style={{margin: 0}}/>
						</Button>
					)}
				</Card.Content>
			</Card>
		</Card.Group>
	);
}

export default PostCard;
