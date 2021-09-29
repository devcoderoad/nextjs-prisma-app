function FlashMessage({ props }) {
	// console.log(props);
	if (
		props &&
		props.hasOwnProperty('type') &&
		props.hasOwnProperty('error') &&
		props.hasOwnProperty('message')
	) {
		const {
			type = 'info',
			error = 'No error found',
			message = 'No error messages',
		} = props;

		const alert = type ? `${type} ` : '';

		let alertClass = '';
		switch (type) {
			case 'danger':
				alertClass = ` ${alert}bg-red-100 border-red-600 text-red-700`;
				break;
			case 'warning':
				alertClass = ` ${alert}bg-yellow-100 border-yellow-600 text-yellow-700`;
				break;
			case 'success':
				alertClass = ` ${alert}bg-green-100 border-green-600 text-green-700`;
				break;
			default:
				alertClass = ` ${alert}bg-blue-100 border-blue-600 text-blue-700`;
				break;
		}

		return (
			<div
				className={`grid w-full rounded-md shadow-md p-5 mx-auto mt-2 mb-10 border${alertClass}`}
			>
				<h2 className="mx-auto text-center text-3xl">{error}</h2>
				<div className="my-5">{message}</div>
			</div>
		);
	} else {
		return null;
	}
}

export default FlashMessage;
