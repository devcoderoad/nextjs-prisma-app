import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/* components */
import Layout from '@components/layout/Layout';
import FormRegister from '@components/form/FormRegister';

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* register schemas */
const FORM_DATA_REGISTER = {
	username: {
		value: '',
		label: 'Username',
		min: 10,
		max: 36,
		required: true,
		validator: {
			regEx: /^[a-z\sA-Z0-9\W\w]+$/,
			error: 'Username fill correctly',
		},
	},
	email: {
		value: '',
		label: 'Email',
		min: 10,
		max: 36,
		required: true,
		validator: {
			regEx: emailRegEx,
			error: 'Email fill correctly',
		},
	},
	password: {
		value: '',
		label: 'Password',
		min: 6,
		max: 36,
		required: true,
		validator: {
			regEx: /^[a-z\sA-Z0-9\W\w]+$/,
			error: 'Password fill correctly',
		},
	},
};

function Register(props) {
	const { baseApiUrl } = props;

	const [stateFormData, setStateFormData] = useState(FORM_DATA_REGISTER);
	const [stateFormError, setStateFormError] = useState([]);
	const [stateFormValid, setStateFormValid] = useState(false);
	const [stateFormMessage, setStateFormMessage] = useState({});

	function onChangeHandler(e) {
		const { name, value } = e.currentTarget;

		setStateFormData({
			...stateFormData,
			[name]: {
				...stateFormData[name],
				value,
			},
		});

		/* validation handler */
		validationHandler(stateFormData, e);
	}

	async function onSubmitHandler(e) {
		e.preventDefault();

		let data = { ...stateFormData };

		/* validation handler */
		const isValid = validationHandler(stateFormData);
		console.log(stateFormValid);

		if (stateFormValid) {
			/* username */
			data = { ...data, username: data.username.value || '' };
			/* email */
			data = { ...data, email: data.email.value || '' };
			/* password */
			data = { ...data, password: data.password.value || '' };

			/* validation handler */
			const isValid = validationHandler(stateFormData);

			if (isValid) {
				// Call an external API endpoint to get posts.
				// You can use any data fetching library
				const loginApi = await fetch(`${baseApiUrl}/user`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				// const posts = postsApi.json();
				let result = await loginApi.json();
				if (result.success && result.token) {
					localStorage.setItem('token', result.token);
					Router.push({ pathname: '/', query: {} }, '/');
				}
			}
		}
	}

	function validationHandler(states, e) {
		const input = (e && e.target.name) || '';
		const errors = [];
		let isValid = true;

		if (input) {
			if (states[input].required) {
				if (!states[input].value) {
					errors[input] = {
						hint: `${states[e.target.name].label} required`,
						isInvalid: true,
					};
					isValid = false;
				}
			}
			if (
				states[input].value &&
				states[input].min > states[input].value.length
			) {
				errors[input] = {
					hint: `Min ${states[input].label} length ${states[input].min}`,
					isInvalid: true,
				};
				isValid = false;
			}
			if (
				states[input].value &&
				states[input].max < states[input].value.length
			) {
				errors[input] = {
					hint: `Min ${states[input].label} length ${states[input].max}`,
					isInvalid: true,
				};
				isValid = false;
			}
			if (
				states[input].validator !== null &&
				typeof states[input].validator === 'object'
			) {
				if (
					states[input].value &&
					!states[input].validator.regEx.test(states[input].value)
				) {
					errors[input] = {
						hint: states[input].validator.error,
						isInvalid: true,
					};
					isValid = false;
				}
			}
		} else {
			Object.entries(states).forEach((item) => {
				item.forEach((field) => {
					errors[item[0]] = '';
					if (field.required) {
						if (!field.value) {
							errors[item[0]] = {
								hint: `${field.label} required`,
								isInvalid: true,
							};
							isValid = false;
						}
					}
					if (field.value && field.min >= field.value.length) {
						errors[item[0]] = {
							hint: `Min ${field.label} length ${field.min}`,
							isInvalid: true,
						};
						isValid = false;
					}
					if (field.value && field.max <= field.value.length) {
						errors[item[0]] = {
							hint: `Min ${field.label} length ${field.max}`,
							isInvalid: true,
						};
						isValid = false;
					}
					if (field.validator !== null && typeof field.validator === 'object') {
						if (field.value && !field.validator.regEx.test(field.value)) {
							errors[item[0]] = {
								hint: field.validator.error,
								isInvalid: true,
							};
							isValid = false;
						}
					}
				});
			});
		}
		if (isValid) {
			setStateFormValid(isValid);
		}
		setStateFormError({
			...errors,
		});
		return isValid;
	}

	return (
		<Layout title="Next.js with Prisma | Register page">
			<div className="container mx-auto py-20">
				<Link
					href={{
						pathname: '/user',
					}}
				>
					<a>&larr; Back</a>
				</Link>
				<FormRegister
					props={{
						onSubmitHandler,
						onChangeHandler,
						stateFormData,
						stateFormError,
						stateFormMessage,
					}}
				/>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { req } = context;
	const referer = req.headers.referer || '';
	const host = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';

	const baseApiUrl = `${host}${req.headers.host}/api`;

	return {
		props: {
			baseApiUrl,
			referer,
		},
	};
}

export default Register;
