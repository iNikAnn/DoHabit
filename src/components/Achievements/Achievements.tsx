import styles from '../../css/Achievements.module.css';

// stores
import { useDialogStore } from '../../stores/dialogStore';
import { useAchievementsStore } from '../../stores/achievementsStore';

// components
import SectionHeader from '../Containment/SectionHeader';
import Placeholder from '../Placeholder';
import RegularAchievementCard from './RegularAchievementCard';
import SecretAchievementCard from './SecretAchievementCard';

// types
import { Achievement } from '../../types/achievement';

// @ts-ignore
const publicUrl = process.env.PUBLIC_URL ?? '/';

function Achievements() {

	const openDialog = useDialogStore((s) => s.open);

	const achievements = useAchievementsStore((s) => s.achievements);
	const regularAchievements = achievements.filter((a) => !a.isSecret);
	const secretAchievements = achievements.filter((a) => a.isSecret && a.isUnlocked);
	const sortedSecretAchievements = secretAchievements.toSorted(
		// @ts-ignore
		(a, b) => new Date(b.unlockDate).getTime() - new Date(a.unlockDate).getTime()
	);

	const handleShowDetails = (a: Achievement) => {
		if (!a.isUnlocked || !a.unlockDate) return;

		openDialog({
			title: a.title,
			subTitle: 'Unlock Date: ' + new Date(a.unlockDate).toLocaleDateString(),
			imgSrc: `${publicUrl}/img/achievements/${a.id}.svg`,
			text: a.desc
		});
	};

	return (
		<div className={styles.achievements}>
			<section>
				<SectionHeader
					title='Streaks'
					button={{
						variant: 'text',
						text: 'Show info',
						onClick: () => openDialog({
							text: 'To unlock an achievement, complete a streak of the required number of days in any of your habits.'
						})
					}}
				/>

				<ul className={styles.regularAchievements}>
					{regularAchievements.map(
						(a) => (
							<RegularAchievementCard
								key={a.id}
								achievement={a}
								imgSrc={`${publicUrl}/img/achievements/${a.id}.svg`}
								onClick={() => handleShowDetails(a)}
							/>
						)
					)}
				</ul>
			</section>

			<section>
				<SectionHeader
					title='Secret achievements'
					button={{
						variant: 'text',
						text: 'Show info',
						onClick: () => openDialog({
							text: 'Surprise! These achievements are like unicorns — rare and totally unexpected!\nUse the app regularly, and you might just unlock some hidden achievements along the way!'
						})
					}}
				/>

				{sortedSecretAchievements.length ? (
					<ul className={styles.secretAchievements}>
						{sortedSecretAchievements.map(
							(a) => (
								<SecretAchievementCard
									key={a.id}
									achievement={a}
									imgSrc={`${publicUrl}/img/achievements/${a.id}.svg`}
									onClick={() => handleShowDetails(a)}
								/>
							)
						)}
					</ul>
				) : (
					<Placeholder
						title='No secret achievements unlocked'
						desc='Try exploring or playing to discover hidden achievements!'
					/>
				)}
			</section>
		</div>
	);
}

export default Achievements;