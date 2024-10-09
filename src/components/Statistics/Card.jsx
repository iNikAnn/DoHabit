import styles from '../../css/Card.module.css';

// components
import CardHeader from './CardHeader';

function Card({ title, desc, icon, accentColor, children, contentStyle }) {
	return (
		<div className={styles.chart}>
			<CardHeader
				{...{ title, desc, icon }}
				iconColor={accentColor}
			/>

			<div
				style={contentStyle}
				className={styles.childrenWrapepr}
			>
				{children}
			</div>
		</div>
	);
}

export default Card;