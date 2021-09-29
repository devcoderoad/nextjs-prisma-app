import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

/* components */
import Layout from '@components/layout/Layout';
import FormLogin from '@components/form/FormLogin';

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* login schemas */
const FORM_DATA_LOGIN = {
	email: {
		value: '',
		label: 'Email',
		min: 10,
		max: 36,
		required: true,
		validator: {
			regEx: emailRegEx,
			error: 'Please insert valid email',
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
			error: 'Please insert valid password',
		},
	},
};

// const host = process.env.NODE_ENV === "production" ? "https://" : "http://";
// const baseApiUrl = `${host}${req.headers.host}/api/login`;

// jwt.decode

function Login(props) {
	const { baseApiUrl, referer } = props;
	// console.log(referer);

	const [stateFormData, setStateFormData] = useState(FORM_DATA_LOGIN);
	const [stateFormError, setStateFormError] = useState([]);
	const [stateFormValid, setStateFormValid] = useState(false);
	const [stateFormMessage, setStateFormMessage] = useState({});

	useEffect(() => {
		const jwtToken = localStorage.token;
		var decoded = jwt.decode(jwtToken, { complete: true });
		// console.log(decoded);
	}, []);

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

		/* email */
		data = { ...data, email: data.email.value || '' };
		/* password */
		data = { ...data, password: data.password.value || '' };

		/* validation handler */
		const isValid = validationHandler(stateFormData);

		if (isValid) {
			// console.log(data);
			/* dispatchLogin(data); */
			// Call an external API endpoint to get posts.
			// You can use any data fetching library
			const loginApi = await fetch(`${baseApiUrl}/user/auth`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			// const posts = postsApi.json();
			// stateFormMessage
			let result = await loginApi.json();
			//console.log(result);
			if (result.success && result.token) {
				// localStorage.setItem("token", result.token);
				Cookies.set('token', result.token);
				// Router.push({ pathname: referer || "/", query: {} }, "/");
				// Router.push(referer);
				// window.location.href = referer.includes("/user/login") ? "/" : referer;
				// window.location.href = referer.includes("/user/login") ? "/" : referer;
				window.location.href = '/';
				// console.log(referer.includes("/user/login"));
			} else {
				setStateFormMessage(result);
			}
		}
	}
	// console.log(stateFormMessage);
	function validationHandler(states, e) {
		const input = (e && e.target.name) || '';
		const errors = [];
		let isValid = true;

		if (input) {
			if (states[input].required) {
				if (!states[input].value) {
					errors[input] = {
						hint: `${states[e.target.name].label} wajib diisi`,
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
					hint: `Kolom ${states[input].label} minimal ${states[input].min}`,
					isInvalid: true,
				};
				isValid = false;
			}
			if (
				states[input].value &&
				states[input].max < states[input].value.length
			) {
				errors[input] = {
					hint: `Kolom ${states[input].label} maksimal ${states[input].max}`,
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
							hint: `Kolom ${field.label} minimal ${field.min}`,
							isInvalid: true,
						};
						isValid = false;
					}
					if (field.value && field.max <= field.value.length) {
						errors[item[0]] = {
							hint: `Kolom ${field.label} maksimal ${field.max}`,
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
	// console.log(stateFormMessage);
	return (
		<Layout title="Next.js with Prisma | Login page">
			<div className="container mx-auto py-20">
				<Link
					href={{
						pathname: '/user',
					}}
				>
					<a>&larr; Back</a>
				</Link>
				<FormLogin
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

export default Login;
