function validateModalProps(props) {
	if (!props.modalTitle) {
		throw new Error('Please provide a \'modalTitle\' in the props');
	}
	else if (!props.modalContent) {
		throw new Error('Please provide a \'modalContent\' in the props');
	};
}

export default validateModalProps;