import styles from '../../css/SecretAchievementCard.module.css';

// types
import { Achievement } from '../../types/achievement';

interface Props {
	achievement: Achievement;
	imgSrc: string;
	onClick: () => void;
}

function SecretAchievementCard({ achievement, imgSrc, onClick }: Props) {
	return (
		<li
			className={styles.card}
			onClick={onClick}
		>
			<img
				src={imgSrc}
				alt={achievement.title}
				className={styles.img}
			/>

			<div className={styles.infoWrapper}>
				<h4>
					{achievement.title}
				</h4>

				<small className={styles.desc}>
					{achievement.desc}
				</small>
			</div>
		</li>
	);
}

export default SecretAchievementCard;