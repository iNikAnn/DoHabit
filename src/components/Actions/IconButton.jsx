import styles from '../../css/IconButton.module.css';

function IconButton({ style, icon, title, onClick, disabled }) {
	return (
		<button
			style={style}
			className={styles.btn}
			aria-label={title}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
		</button>
	);
}

export default IconButton;