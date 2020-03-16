import React, { useContext, useState } from 'react';
import { Form, Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth'
import { useMutation } from '@apollo/react-hooks';
import { useForm } from './../utils/hooks'
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from './../queries/FETCH_POSTS_QUERY';

function PostForm(props) {

	console.log(props)
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		body: ''
	})

	const [createPost, { error }] = useMutation(CREATE_POST, {
		variables: values,
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY
			});
			const new_post = result.data.createPost;
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: { getPosts: [new_post, ...data.getPosts] }
			});
			values.body = '';
		},
		refetchQueries: refetchPosts => [{query: FETCH_POSTS_QUERY}]
	});


	function createPostCallback() {
		createPost()
	}

	return (
		<Form onSubmit={onSubmit} className={'post-form'}>
			<Form.Field>
				<Form.Input
					placeholder='Your post'
					name='body'
					onChange={onChange}
					value={values.body}
				/>
				<Button type='submit' color='teal'>Create</Button>
			</Form.Field>
		</Form>)
}

const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(
			body: $body
		) {
			id body createdAt username
		}
		
	}
`;

/*
likePost {
			id
			username
			createdAt
		}
		comments {
			id createdAt username body
		}
				commentCount

*/

export default PostForm;
