function FormPost(props) {
	const {
		onSubmit,
		onChange,
		stateFormData,
		stateFormError,
		stateFormValid,
		stateFormMessage,
	} = props;
	return (
		<form onSubmit={onSubmit} className="form-post card my-20" method="POST">
			<div className="form-group">
				<h2 className="font-bold uppercase text-2xl">Form Post</h2>
				<hr />
				{stateFormMessage.status === 'error' && (
					<h4 className="warning text-center">{stateFormMessage.error}</h4>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="title">Title</label>
				<input
					className="form-control block w-full"
					type="text"
					id="title"
					name="title"
					placeholder="Post Title"
					// defaultValue=""
					onChange={onChange}
					value={stateFormData.title.value}
				/>
				{stateFormError.title && (
					<span className="warning">{stateFormError.title.hint}</span>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="text">Content</label>
				<textarea
					className="form-control block w-full"
					type="text"
					id="text"
					name="content"
					placeholder="Post Content"
					// defaultValue=""
					onChange={onChange}
					value={stateFormData.content.value}
				/>
				{stateFormError.content && (
					<span className="warning">{stateFormError.content.hint}</span>
				)}
			</div>
			<div className="mt-4">
				<button type="submit" className="btn btn-block btn-warning">
					Submit
				</button>
			</div>
		</form>
	);
}
export default FormPost;
