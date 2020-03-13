import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { PromiseProvider } from 'mongoose';
import { useForm } from './../utils/hooks'
import { AuthContext } from './../context/auth'

function Register(props) {
	const context = useContext(AuthContext)
	// const [values, setValues] = useState({
	// 	username: '',
	// 	email: '',
	// 	password: '',
	// 	confirmPassword: '',
	// });

	const initialState = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [errors, setError] = useState({})

	const { onChange, onSubmit, values } = useForm(register, initialState)

	// const onChange = event => {
	// 	setValues({ ...values, [event.target.name]: event.target.value });
	// };

	const [addNewUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			context.login(userData)
			props.history.push('/')
		},
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.exception.errors)
			setError(err.graphQLErrors[0].extensions.exception.errors)
		},
		variables: values
	});

	function register() {
		addNewUser()
	}

	// const onSubmit = event => {
	// 	event.preventDefault();
	// 	addNewUser();
	// };

	return (
		<div className='form-container'>
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1>Register</h1>
				<Form.Input
					label='Username'
					placeholder='Username..'
					type='text'
					name='username'
					value={values.username}
					onChange={onChange}
					error={errors.username ? true : false}
				/>
				<Form.Input
					label='Email'
					type='text'
					placeholder='Email..'
					name='email'
					value={values.email}
					onChange={onChange}
					error={errors.email ? true : false}
				/>
				<Form.Input
					label='Password'
					placeholder='Password..'
					name='password'
					type='password'
					value={values.password}
					onChange={onChange}
					error={errors.password ? true : false}
				/>
				<Form.Input
					label='Confirm Password'
					placeholder='Confirm Password..'
					name='confirmPassword'
					type='password'
					value={values.confirmPassword}
					onChange={onChange}
					error={errors.confirmPassword ? true : false}
				/>
				<Button type='submit' primary>
					Register
				</Button>
			</Form>
			{Object.values(errors).length > 0 &&
				<div className="ui error message">
					<ul>
						{Object.values(errors).map((obj) => {
							return (
								<li key={`${obj}`}>{obj}</li>
							)
						}
						)
						}
					</ul>
				</div>
			}
		</div>
	);
}

const REGISTER_USER = gql`
	mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
