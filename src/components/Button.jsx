import styles from '../css/Button.module.css';

function Button(props) {
	const {
		type, icon, text, bgColor, disabled, onClick
	} = props;

	return (
		<button
			type={type || 'button'}
			style={{ backgroundColor: bgColor }}
			className={styles.button}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
			{text}
		</button>
	);
}

export default Button;