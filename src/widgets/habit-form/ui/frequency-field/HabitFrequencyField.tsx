import styles from './HabitFrequencyField.module.css';
import { Button, SectionHeader } from '@shared/ui';
import { useState } from 'react';

interface Props {
	initialFrequency?: number;
}

const MAX_FREQUENCY = 6;

function HabitFrequencyField({ initialFrequency = 1 }: Props) {
	const [frequency, setFrequency] = useState(initialFrequency);

	const handleClick = (action: 'increment' | 'decrement') => {
		setFrequency((prev) => {
			if (action === 'decrement') {
				return Math.max(1, prev - 1);
			} else {
				return Math.min(MAX_FREQUENCY, prev + 1);
			}
		});
	};

	return (
		<section>
			<SectionHeader
				title='Frequency'
				description='Times per day you want to repeat this habit.'
			/>

			<div className={styles.content}>
				<div className={styles.inputWrapper}>
					<input
						type='number'
						name='frequency'
						id='frequency'
						className={`${styles.input}`}
						value={frequency}
						tabIndex={-1}
						readOnly
					/>

					<div>/ Day</div>
				</div>

				<div className={styles.buttonsWrapper}>
					<Button
						className={styles.button}
						onClick={() => handleClick('decrement')}
						disabled={frequency <= 1}
					>
						-
					</Button>

					<Button
						className={styles.button}
						onClick={() => handleClick('increment')}
						disabled={frequency >= MAX_FREQUENCY}
					>
						+
					</Button>
				</div>
			</div>
		</section >
	);
}

export default HabitFrequencyField;