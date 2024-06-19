import styles from '../css/Placeholder.module.css';

function Placeholder(props) {
	const {
		image, title, desc,
		onClick, textOnButton, accentColor
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

			<button
				style={{ backgroundColor: accentColor }}
				onClick={onClick}
			>
				{textOnButton}
			</button>
		</div>
	);
}

export default Placeholder;