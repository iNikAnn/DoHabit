import styles from '../../css/RegularAchievementCard.module.css';

function RegularAchievementCard({ achievement, imgSrc, onClick }) {
	return (
		<li
			className={`${styles.card} ${achievement.isUnlocked ? styles.unlocked : ''}`}
			onClick={onClick}
		>
			<img
				style={{ filter: `saturate(${achievement.isUnlocked ? 1 : 0})` }}
				className={styles.img}
				src={imgSrc}
				alt={achievement.title}
			/>

			<small className={styles.title}>
				{achievement.title}
			</small>
		</li>
	);
}

export default RegularAchievementCard;