import styles from '../../css/IconButton.module.css';

function IconButton({ style = {}, icon, text, onClick, disabled = false }) {
	return (
		<button
			style={style}
			className={styles.btn}
			aria-label={text}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
		</button>
	);
}

export default IconButton;