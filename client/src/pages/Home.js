import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from './../queries/FETCH_POSTS_QUERY';
import UIWrapper from './../UIWrapper';
import { Grid, Button, Label, Icon, Form } from 'semantic-ui-react';
import PostCard from './../components/PostCard';
import PostForm from './../components/PostForm';
import { AuthContext } from './../context/auth'

function Home() {
	const { user } = useContext(AuthContext)

	const [formState, setFormState] = useState(false)
	const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		if (data) {
			setPosts(data.getPosts);
		}
	}, [data]);

	function openForm() {
		setFormState(!formState)
	}

	if (error) return <h1>Someting went wrong :(</h1>
	if (loading) return <h1>loading...</h1>
	if (data) {
		return (
			<UIWrapper>
				<Grid columns={3}>
					<Grid.Row className={'page-title'}>
						<div>
							<Button as='div' labelPosition='right' onClick={openForm}>
								<Label basic color='teal'>
									<Icon name='pencil alternate' />
									Create new Post!
								</Label>
							</Button>
							{user && formState && (
								<Grid.Column>
									<PostForm />
								</Grid.Column>
							)}
						</div>
						<h1>Recent Posts</h1>
					</Grid.Row>
					<Grid.Row>
						{loading ? (
							<h1>loading posts...</h1>
						) : (
							posts &&
							posts
									//.slice(0, 4)
									.map(post => (
										<Grid.Column key={`${post.id}`} style={{ marginBottom: 25 }}>
											<PostCard post={post} />
										</Grid.Column>
									))
							)}
					</Grid.Row>
				</Grid>
			</UIWrapper>
		);
	}
}

export default Home;
