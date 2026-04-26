interface Props {
	modalTitle: string;
}

function validateModalProps(props: Props) {
	if (!props.modalTitle) {
		throw new Error('Please provide a \'modalTitle\' in the props');
	}
}

export default validateModalProps;