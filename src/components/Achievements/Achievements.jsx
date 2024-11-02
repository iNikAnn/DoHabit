import styles from '../../css/Achievements.module.css';

// components
import SectionHeader from '../Containment/SectionHeader';
import Placeholder from '../Placeholder';
import RegularAchievementCard from './RegularAchievementCard';
import SecretAchievementCard from './SecretAchievementCard';

const publicUrl = process.env.PUBLIC_URL;

function Achievements({ achievements, onOpenDialog }) {

	const regularAchievements = achievements.filter((a) => !a.isSecret);
	const secretAchievements = achievements.filter((a) => a.isSecret && a.isUnlocked);
	const sortedSecretAchievements = secretAchievements.toSorted((a, b) => b.unlockDate - a.unlockDate);

	const handleShowDetails = (a) => {
		if (!a.isUnlocked) return;

		onOpenDialog({
			title: a.title,
			subTitle: 'Unlock Date: ' + new Date(a.unlockDate).toLocaleDateString(),
			imgSrc: `${publicUrl}/img/achievements/${a.id}.png`,
			text: a.desc
		});
	};

	return (
		<div className={styles.achievements}>
			<section>
				<SectionHeader
					title="Streaks"
					btn="textButton"
					btnText="Show info"
					btnOnClick={() => onOpenDialog({
						text: 'To unlock an achievement, complete a streak of the required number of days in any of your habits.'
					})}
				/>

				<ul className={styles.regularAchievements}>
					{regularAchievements.map(
						(a) => (
							<RegularAchievementCard
								key={a.id}
								achievement={a}
								imgSrc={`${publicUrl}/img/achievements/${a.id}.png`}
								onClick={() => handleShowDetails(a)}
							/>
						)
					)}
				</ul>
			</section>

			<section>
				<SectionHeader
					title="Secret achievements"
					btn="textButton"
					btnText="Show info"
					btnOnClick={() => onOpenDialog({
						text: 'Surprise! These achievements are like unicorns — rare and totally unexpected!\nUse the app regularly, and you might just unlock some hidden achievements along the way!'
					})}
				/>

				{sortedSecretAchievements.length ? (
					<ul className={styles.secretAchievements}>
						{sortedSecretAchievements.map(
							(a) => (
								<SecretAchievementCard
									key={a.id}
									achievement={a}
									imgSrc={`${publicUrl}/img/achievements/${a.id}.png`}
									onClick={() => handleShowDetails(a)}
								/>
							)
						)}
					</ul>
				) : (
					<Placeholder
						title="No secret achievements unlocked"
						desc="Try exploring or playing to discover hidden achievements!"
					/>
				)}
			</section>
		</div>
	);
}

export default Achievements;