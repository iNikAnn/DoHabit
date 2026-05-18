import { SectionHeader } from '@shared/ui';
import styles from './HabitTitleInput.module.css';
import clsx from 'clsx';

interface HabitTitleInputProps {
	input: string;
	isDuplicate: boolean;
	onChange: (v: string) => void;
}

function HabitTitleInput({ input, isDuplicate, onChange }: HabitTitleInputProps) {
	return (
		<section>
			<SectionHeader
				title='Name'
				extra={isDuplicate && (
					<div className={styles.errorMessage}>
						Already exists.
					</div>
				)}
			/>

			<input
				type='search' // Using 'search' type to kill mobile autofill
				name='title'
				id='title'
				className={clsx(
					styles.input,
					isDuplicate && styles.isDuplicate
				)}
				value={input}
				onChange={(e) => onChange(e.target.value)}
				placeholder='Enter habit name...'
			/>
		</section>
	);
}

export default HabitTitleInput;