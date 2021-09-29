function FormJob(props) {
	const {
		onSubmit,
		onChange,
		stateFormData,
		stateFormError,
		stateFormValid,
		stateFormMessage,
	} = props;
	return (
		<div className="w-50">
			<form onSubmit={onSubmit} className="form-job card" method="POST">
				<div className="form-group align-top mb-4">
					<h2 className="font-bold uppercase text-2xl">Form Job</h2>
					<hr />
					{stateFormMessage.status === 'error' && (
						<h4 className="warning text-center">{stateFormMessage.error}</h4>
					)}
				</div>
				<div className="form-group align-top mb-4">
					<label htmlFor="title">Title</label>
					<input
						className="form-control block"
						type="text"
						id="title"
						name="title"
						placeholder="Job Title"
						onChange={onChange}
						value={stateFormData.title.value}
					/>
					{stateFormError.title && (
						<span className="warning">{stateFormError.title.hint}</span>
					)}
				</div>
				<div className="form-group align-top mb-4">
					<label htmlFor="text">Text</label>
					<textarea
						className="form-control block"
						type="text"
						id="text"
						name="content"
						placeholder="Post Text"
						// defaultValue=""
						onChange={onChange}
						value={stateFormData.content.value}
					/>
					{stateFormError.content && (
						<span className="warning">{stateFormError.content.hint}</span>
					)}
				</div>
				<div className="form-group align-top mb-4">
					<label htmlFor="text">Job Report Manager</label>
					<input
						className="form-control block w-full"
						type="text"
						id="text"
						name="reportManager"
						placeholder="Job Report Manager"
						// defaultValue=""
						onChange={onChange}
						value={stateFormData.reportManager.value}
					/>
					{stateFormError.reportManager && (
						<span className="warning">{stateFormError.reportManager.hint}</span>
					)}
				</div>
				<div className="form-group align-top mb-4">
					<label htmlFor="text">Date Limit</label>
					<input
						className="form-control block w-full"
						type="text"
						id="text"
						name="dateLimit"
						placeholder="Job Date Limit"
						// defaultValue=""
						onChange={onChange}
						value={stateFormData.dateLimit.value}
					/>
					{stateFormError.dateLimit && (
						<span className="warning">{stateFormError.dateLimit.hint}</span>
					)}
				</div>
				<div>
					<button
						type="submit"
						className="btn btn-block btn-warning px-3 py-2 mx-auto uppercase border border-gray-300 bg-gray-100 text-gray-400 hover:text-gray-600"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
export default FormJob;
