// utils
import validateModalProps from './validateModalProps';

function modalReducer(modal, actions) {
	let newModal = { history: [...modal.history], ...actions };
	const isOpen = modal.modalContent;

	switch (actions.type) {
		case 'open':
			validateModalProps(actions);
			document.body.classList.add('no-scroll');

			if (isOpen) {
				newModal.history = [...newModal.history, modal];
			};
			break;

		case 'close':
			if (modal.history.length > 0) {
				newModal = { ...modal.history.pop() };
			} else {
				document.body.classList.remove('no-scroll');
				newModal = { history: [] };
			};
			break;

		default:
			throw new Error('Please provide a valid \'type\' in the actions');
	};

	return newModal;
}

export default modalReducer;