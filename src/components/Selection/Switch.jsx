import styles from '../../css/Switch.module.css';

function Switch({ isActive, onClick }) {
	return (
		<button
			type='button'
			className={styles.switch}
			onClick={onClick}
		>
			<div className={`${styles.indicator} ${isActive ? styles.active : ''}`} />
		</button>
	);
}

export default Switch;