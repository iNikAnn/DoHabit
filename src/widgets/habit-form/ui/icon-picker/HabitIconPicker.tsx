import styles from './HabitIconPicker.module.css';
import { type ElementType, useState } from 'react';
import { groupBy, pick, upperFirst } from 'es-toolkit';
import { type Habit, HABIT_ICONS } from '@entities/habit';
import { Button, SectionHeader } from '@shared/ui';

interface Props {
	habits: Habit[];
	initialIconTitle?: string;
}

function HabitIconPicker({ habits, initialIconTitle = 'default' }: Props) {
	const [showMore, setShowMore] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState(initialIconTitle);

	const usedIcons = new Set(habits.map((h) => h.iconTitle));
	const groupedIcons = groupBy(HABIT_ICONS, (icon) => icon.category);

	// Only show the 'Featured' group unless 'showMore' is toggled
	const visibleIcons = showMore
		? groupedIcons
		: pick(groupedIcons, ['featured']);

	return (
		<section>
			<SectionHeader
				title='Icon'
				description={habits.length > 0
					? 'Faded icons are already in use. You can still reuse them.'
					: undefined}
				extra={(
					<Button
						variant='text'
						onClick={() => setShowMore((state) => !state)}
					>
						{'Show ' + (showMore ? 'less' : 'more')}
					</Button>
				)}
			/>

			<div className={styles.iconCategoryList}>
				<input
					key='selectedIcon'
					type='hidden'
					name='iconTitle'
					id='iconTitle'
					value={selectedIcon}
					readOnly
				/>

				{Object.entries(visibleIcons).map(([category, icons]) => (
					<div key={category}>
						{category !== 'featured' && (
							<small className={styles.iconCategoryName}>
								{upperFirst(category)}
							</small>
						)}

						<div className={styles.iconList}>
							{icons.map(({ iconTitle, icon }, index) => {
								const IconComponent = icon as ElementType;
								const isUsed = usedIcons.has(iconTitle);

								return (
									<label
										key={iconTitle}
										style={{ opacity: isUsed ? 0.5 : 1 }}
										className={styles.iconLabel}
									>
										<input
											type='radio'
											name='icon'
											id={iconTitle}
											value={iconTitle}
											onChange={(e) => setSelectedIcon(e.target.value)}
											defaultChecked={iconTitle === initialIconTitle || (!initialIconTitle && !index)}
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

export default HabitIconPicker;