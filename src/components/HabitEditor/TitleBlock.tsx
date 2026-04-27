import styles from '../../css/TitleBlock.module.css';

// react
import { useEffect, useState } from 'react';

interface Props {
	input: string;
	alreadyExist: boolean;
	onChange: (value: string) => void;
}

function TitleBlock({ input, alreadyExist, onChange }: Props) {
	// error message
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (alreadyExist) {
			setErrorMessage(input
				? 'A habit with this name already exists.'
				: 'Title field cannot be empty.'
			);
		} else {
			setErrorMessage('');
		}

		return () => setErrorMessage('');
	}, [input, alreadyExist]);

	return (
		<section>
			<div className={styles.header}>
				<h3>Title</h3>

				{alreadyExist && (
					<small className={styles.errorMessage}>
						{errorMessage}
					</small>
				)}
			</div>

			<input type='text' name='title' id='title'
				className={`${styles.input} ${alreadyExist ? styles.alreadyExist : ''}`}
				value={input}
				onChange={(e) => onChange(e.target.value)}
				placeholder='Enter habit title'
			/>
		</section>
	);
}

export default TitleBlock;