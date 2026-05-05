import styles from '../../css/AddNoteForm.module.css';

// react
import { ForwardedRef, forwardRef, SubmitEventHandler } from 'react';

// components
import { Button } from '@shared/ui';

// icons
import { IoSend } from 'react-icons/io5';

interface Props {
	input: string;
	onChange: (v: string) => void;
	onFocus: () => void;
	onSubmit: (v: string) => void;
	isSendBtnVisible: boolean;
}

const AddNoteForm = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		input,
		onChange,
		onFocus,
		onSubmit,
		isSendBtnVisible,
	} = props;

	const handleSubmitForm: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onSubmit(input);
		onChange('');

		if (ref && typeof ref !== 'function') {
			ref.current?.blur()
		}
	};

	return (
		<form
			className={styles.form}
			action='submit'
			onSubmit={handleSubmitForm}
		>
			<input
				ref={ref}
				type='text'
				name='newNote'
				id='newNote'
				value={input}
				onChange={(e) => onChange(e.target.value)}
				onFocus={onFocus}
				placeholder='Enter your note here...'
			/>

			{isSendBtnVisible && (
				<Button
					type='submit'
					icon={<IoSend />}
					disabled={!input.length}
				/>
			)}
		</form>
	);
});

export default AddNoteForm;