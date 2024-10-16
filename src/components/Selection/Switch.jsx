import styles from '../../css/Switch.module.css';

function Switch({ active, onClick }) {
	return (
		<button
			type='button'
			className={styles.switch}
			onClick={onClick}
		>
			<div className={`${styles.indicator} ${active ? styles.active : ''}`} />
		</button>
	);
}

export default Switch;