import styles from '../css/Button.module.css';

function Button(props) {
	const {
		icon, text, bgColor,
		onClick
	} = props;

	return (
		<button
			style={{ backgroundColor: bgColor }}
			className={styles.button}
			onClick={onClick}
		>
			{icon}
			{text}
		</button>
	);
}

export default Button;