// utils
import validateModalProps from './validateModalProps';

function modalReducer(modal, actions) {
	const actionsIsObj = typeof actions === 'object'
		&& !Array.isArray(actions)
		&& actions !== null;

	if (!actionsIsObj) {
		throw new Error('Actions must be an object');
	};

	let newModal;

	switch (actions.type) {
		case 'open':
			validateModalProps(actions);
			newModal = { ...actions, prev: modal };
			document.body.classList.add('no-scroll');
			break;

		case 'close':
			if (modal.prev) {
				newModal = modal.prev;
			} else {
				document.body.classList.remove('no-scroll');
				newModal = null;
			};
			break;

		default:
			throw new Error('Please provide a valid \'type\' in the actions');
	};

	return newModal;
}

export default modalReducer;