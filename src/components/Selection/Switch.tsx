import styles from '../../css/Switch.module.css';

interface Props {
	isActive: boolean;
	onClick: (...args: any) => void;
}

function Switch({ isActive, onClick }: Props) {
	return (
		<div
			role='button'
			// type='button'
			className={styles.switch}
			onClick={onClick}
		>
			<div className={`${styles.indicator} ${isActive ? styles.active : ''}`} />
		</div>
	);
}

export default Switch;