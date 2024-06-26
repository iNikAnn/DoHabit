function validateModalProps(props) {
	const propsIsObj = typeof props === 'object' && !Array.isArray(props);

	if (!propsIsObj) {
		throw new Error('Props must be an object');
	}
	else if (!props.modalTitle) {
		throw new Error('Please provide a \'modalTitle\' in the props');
	}
	else if (!props.modalContent) {
		throw new Error('Please provide a \'modalContent\' in the props');
	};
}

export default validateModalProps;