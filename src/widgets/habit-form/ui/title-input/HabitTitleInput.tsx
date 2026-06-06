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
				title={t('habits.form.nameTitle')}
				extra={isDuplicate ? (
					<div className={styles.errorMessage}>
						{t('habits.form.errors.alreadyExists')}
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
				placeholder={t('habits.form.namePlaceholder')}
				autoComplete='off'
			/>
		</section>
	);
}

export default HabitTitleInput;