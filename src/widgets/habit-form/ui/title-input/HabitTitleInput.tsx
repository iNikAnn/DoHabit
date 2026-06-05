import styles from './HabitTitleInput.module.css';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '@shared/ui';

interface HabitTitleInputProps {
	input: string;
	isDuplicate: boolean;
	onChange: (v: string) => void;
}

function HabitTitleInput({ input, isDuplicate, onChange }: HabitTitleInputProps) {
	const { t } = useTranslation();

	return (
		<section>
			<SectionHeader
				title={t('habits.sectionNameTitle')}
				extra={isDuplicate ? (
					<div className={styles.errorMessage}>
						{t('habits.errorAlreadyExists')}
					</div>
				) : undefined}
			/>

			<input
				type='search' // Using 'search' type to kill mobile autofill
				enterKeyHint='enter'
				name='title'
				id='title'
				className={clsx(
					styles.input,
					isDuplicate && styles.isDuplicate
				)}
				value={input}
				onChange={(e) => onChange(e.target.value)}
				placeholder={t('habits.inputNamePlaceholder')}
				autoComplete='off'
			/>
		</section>
	);
}

export default HabitTitleInput;