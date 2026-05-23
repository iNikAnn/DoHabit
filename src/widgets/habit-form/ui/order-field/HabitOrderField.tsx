import styles from './HabitOrderField.module.css';
import { useState } from 'react';
import { type Habit } from '@entities/habit';
import { Button, SectionHeader } from '@shared/ui';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface Props {
	habits: Habit[];
	habit: Habit;
}

function HabitOrderField({ habits, habit }: Props) {
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
				title='Order'
				description={`The habit's position in your list.`}
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
							className={styles.button}
							onClick={() => handleChangeOrder('down')}
							disabled={currentOrder === habitsCount}
						>
							Step Down
						</Button>

						<Button
							icon={<FaArrowUp />}
							className={styles.button}
							onClick={() => handleChangeOrder('up')}
							disabled={currentOrder === 1}
						>
							Step Up
						</Button>
					</div>
				</div>

				<div className={styles.bottom}>
					<Button
						type='button'
						onClick={() => handleChangeOrder('bottom')}
						disabled={currentOrder === habitsCount}
					>
						{currentOrder === habitsCount ? 'Already at' : 'Move to'} Bottom
					</Button>

					<Button
						type='button'
						onClick={() => handleChangeOrder('top')}
						disabled={currentOrder === 1}
					>
						{currentOrder === 1 ? 'Already at' : 'Move to'} Top
					</Button>
				</div>
			</div>
		</section>
	);
}

export default HabitOrderField;