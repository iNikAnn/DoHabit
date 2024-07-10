import styles from '../css/Placeholder.module.css';

// componets
import Button from './Button';

function Placeholder(props) {
	const {
		image, title, desc,
		textOnButton, buttonIcon,
		onClick, accentColor
	} = props;

	return (
		<div className={styles.placeholder}>
			{image}

			<div className={styles.textWrapper}>
				<h3>{title}</h3>
				<span className={styles.desc}>
					{desc}
				</span>
			</div>

			{textOnButton && (
				<Button
					icon={buttonIcon}
					text={textOnButton}
					bgColor={accentColor}
					onClick={onClick}
				/>
			)}
		</div>
	);
}

export default Placeholder;