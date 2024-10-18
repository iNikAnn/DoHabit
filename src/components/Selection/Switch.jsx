import styles from '../../css/Switch.module.css';

function Switch({ isActive, onClick }) {
	return (
		<div
			role='button'
			type='button'
			className={styles.switch}
			onClick={onClick}
		>
			<div className={`${styles.indicator} ${isActive ? styles.active : ''}`} />
		</div>
	);
}

export default Switch;