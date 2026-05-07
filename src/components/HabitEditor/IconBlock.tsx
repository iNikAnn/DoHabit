import styles from '../../css/IconBlock.module.css';
import { ElementType, useState } from 'react';
import { groupBy, pick } from 'es-toolkit';
import { Habit, HABIT_ICONS } from '@entities/habit';

interface Props {
	habits: Habit[];
	currentIconTitle?: string;
}

function IconBlock({ habits, currentIconTitle = 'default' }: Props) {

	const [showMore, setShowMore] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState(currentIconTitle);

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
							{icons.map(({ iconTitle, icon }, index) => {
								const IconComponent = icon as ElementType;
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