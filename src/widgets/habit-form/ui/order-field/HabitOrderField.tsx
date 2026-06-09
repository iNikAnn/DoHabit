import styles from './HabitOrderField.module.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { type Habit } from '@entities/habit';
import { Button, SectionHeader } from '@shared/ui';

interface Props {
	habits: Habit[];
	habit: Habit;
}

function HabitOrderField({ habits, habit }: Props) {
	const { t } = useTranslation();
	const activeHabits = habits.filter((h) => !h.isArchived);
	const habitsCount = activeHabits.length;

	const [currentOrder, setCurrentOrder] = useState(() => (
		habit ? activeHabits.indexOf(habit) + 1 : -1
	));

	const handleChangeOrder = (dir: 'top' | 'bottom' | 'up' | 'down') => {
		setCurrentOrder((prev) => {
			switch (dir) {
				case 'bottom':
					return habitsCount;

				case 'top':
					return 1;

				case 'down':
					return prev + 1 <= habitsCount ? prev + 1 : prev;

				case 'up':
					return prev - 1 >= 1 ? prev - 1 : prev;

				default:
					return prev;
			}
		});
	};

	return (
		<section style={{ pointerEvents: 'none' }}>
			<SectionHeader
				title={t('habits.form.orderTitle')}
				description={t('habits.form.orderDesc')}
			/>

			<div className={styles.content}>
				<div className={styles.top}>
					<input
						className={styles.input}
						type='number'
						name='order'
						id='order'
						value={currentOrder}
						tabIndex={-1}
						readOnly
					/>

					<div className={styles.buttonsWrapper}>
						<Button
							icon={<FaArrowDown />}
							className={styles.stepButton}
							onClick={() => handleChangeOrder('down')}
							disabled={currentOrder === habitsCount}
						>
							{t('habits.form.orderSorting.btnStepDown')}
						</Button>

						<Button
							icon={<FaArrowUp />}
							className={styles.stepButton}
							onClick={() => handleChangeOrder('up')}
							disabled={currentOrder === 1}
						>
							{t('habits.form.orderSorting.btnStepUp')}
						</Button>
					</div>
				</div>

				<div className={styles.bottom}>
					<Button
						className={styles.extremeButton}
						onClick={() => handleChangeOrder('bottom')}
						disabled={currentOrder === habitsCount}
					>
						{currentOrder === habitsCount
							? t('habits.form.orderSorting.btnAlreadyAtBottom')
							: t('habits.form.orderSorting.btnMoveToBottom')}
					</Button>

					<Button
						className={styles.extremeButton}
						onClick={() => handleChangeOrder('top')}
						disabled={currentOrder === 1}
					>
						{currentOrder === 1
							? t('habits.form.orderSorting.btnAlreadyAtTop')
							: t('habits.form.orderSorting.btnMoveToTop')}
					</Button>
				</div>
			</div>
		</section>
	);
}

export default HabitOrderField;