import styles from '../../css/IconBlock.module.css';

// db
import { HABIT_ICONS } from '../../db/dbIcons';

// hooks
import { ElementType, useState } from 'react';

// types
import { Habit } from '../../types/habit';

// utils
import { groupBy, pick } from 'es-toolkit';

interface Props {
	habits: Habit[];
	currentIconTitle: string;
}

function IconBlock({ habits, currentIconTitle }: Props) {

	const [showMore, setShowMore] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState(currentIconTitle ?? 'default');

	const groupedIcons = groupBy(HABIT_ICONS, (icon) => icon.category);

	// Only show the 'Featured' group unless 'showMore' is toggled
	const visibleIcons = showMore
		? groupedIcons
		: pick(groupedIcons, ['Featured']);

	return (
		<section>
			<div className={styles.header}>
				<h3>Icon</h3>

				<button
					type='button'
					className='text-button'
					onClick={() => setShowMore((state) => !state)}
				>
					{'Show ' + (showMore ? 'less' : 'more')}
				</button>
			</div>

			<div className={styles.iconCategoryList}>
				<input
					key='selectedIcon'
					type='hidden'
					name='iconTitle'
					id='iconTitle'
					value={selectedIcon}
					readOnly
				/>

				{Object.entries(visibleIcons).map(([category, icons], index) => (
					<div
						key={category}

					>
						{category !== 'Featured' && (
							<small className={styles.iconCategoryName}>
								{category}
							</small>
						)}

						<div className={styles.iconList}>
							{icons.map(({ iconTitle, Icon }, index) => {
								const IconComponent = Icon as ElementType;
								const isIconUsed = habits.find((habit) => habit.iconTitle === iconTitle);

								return (
									<label
										key={iconTitle}
										style={{ transform: isIconUsed ? 'scale(0.75)' : '' }}
										className={styles.iconLabel}
									>
										<input
											type='radio'
											name='icon'
											id={iconTitle}
											value={iconTitle}
											onChange={(e) => setSelectedIcon(e.target.value)}
											defaultChecked={iconTitle === currentIconTitle || (!currentIconTitle && !index)}
										/>

										<IconComponent />
									</label>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default IconBlock;