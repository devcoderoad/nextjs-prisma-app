function FormLogin({ props }) {
	const {
		onSubmitHandler,
		onChangeHandler,
		stateFormData,
		stateFormError,
		stateFormMessage,
	} = props;

	return (
		<form
			className="form-login card lg:w-2/5 md:w-full mx-auto my-24 shadow-md rounded-md p-5"
			method="POST"
			onSubmit={onSubmitHandler}
		>
			<div className="form-group">
				<h2 className="font-bold uppercase text-2xl">Login</h2>
				<hr />
				{stateFormMessage.status === 'error' && (
					<h4 className="warning text-center">{stateFormMessage.error}</h4>
				)}
			</div>
			<div className="form-group my-4">
				<label htmlFor="email">Email</label>
				<input
					className="form-control block w-full"
					type="text"
					id="email"
					name="email"
					placeholder="Email"
					onChange={onChangeHandler}
					value={stateFormData.email.value}
				/>
				{stateFormError.email && (
					<span className="warning">{stateFormError.email.hint}</span>
				)}
			</div>
			<div className="form-group my-4">
				<label htmlFor="password">Password</label>
				<input
					className="form-control block w-full"
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					onChange={onChangeHandler}
					value={stateFormData.email.password}
				/>
				{stateFormError.password && (
					<span className="warning">{stateFormError.password.hint}</span>
				)}
			</div>
			<div className="mt-4">
				<button
					type="submit"
					className="btn btn-block btn-warning px-3 py-2 mx-auto uppercase border border-gray-300 bg-gray-100 text-gray-400 hover:text-gray-600"
				>
					Login
				</button>
			</div>
		</form>
	);
}
export default FormLogin;
