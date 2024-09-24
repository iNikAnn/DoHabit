import styles from '../../css/AddNoteForm.module.css';

// react
import { forwardRef } from 'react';

// components
import Button from '../Button';

// icons
import { IoSend } from "react-icons/io5";

const AddNoteForm = forwardRef((props, ref) => {
	const {
		input, setInput, isSendBtnVisible,

		// 'on' functions
		onFocus, onBlur, onSubmit
	} = props;

	const handleSubmitForm = (e) => {
		e.preventDefault();
		onSubmit(input);
		setInput('');
		ref.current.blur();
	};

	return (
		<form
			className={styles.form}
			action="submit"
			onSubmit={handleSubmitForm}
		>
			<input
				ref={ref}
				type="text"
				name="newNote"
				id="newNote"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onFocus={onFocus}
				onBlur={onBlur}
				placeholder="Enter your note here..."
			/>

			{isSendBtnVisible && (
				<Button
					type="submit"
					icon={<IoSend />}
					disabled={!input.length}
				/>
			)}
		</form>
	);
});

export default AddNoteForm;