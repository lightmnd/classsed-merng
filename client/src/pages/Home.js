import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from './../queries/FETCH_POSTS_QUERY';
import UIWrapper from './../UIWrapper';
import { Grid } from 'semantic-ui-react';
import PostCard from './../components/PostCard';

function Home() {
	const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

	if (data) console.log('>', data);
	// if (loading) console.log(loading);
	// if (error) throw new Error(error + 'error!');

	return (
		<UIWrapper>
			<Grid columns={3}>
				<Grid.Row className={'page-title'}>
					<h1>Recent Posts</h1>
				</Grid.Row>
				<Grid.Row>
					{loading ? (
						<h1>loading posts...</h1>
					) : (
						data.getPosts &&
						data.getPosts.slice(0, 4).map(post => (
							<Grid.Column key={`${post.id}`} style={{marginBottom: 25}}>
								<PostCard post={post} />
							</Grid.Column>
						))
					)}
				</Grid.Row>
			</Grid>
		</UIWrapper>
	);
}

export default Home;
