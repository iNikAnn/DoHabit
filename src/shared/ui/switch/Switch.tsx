import styles from './Switch.module.css';
import clsx from 'clsx';

interface Props {
	isActive: boolean;
	onClick: (...args: any) => void;
}

/**
 * Toggle switch component.
 */
function Switch({ isActive, onClick }: Props) {
	return (
		<div
			role='button'
			className={styles.switch}
			onClick={onClick}
		>
			<div className={clsx(
				styles.indicator,
				isActive && styles.active
			)} />
		</div>
	);
}

export { Switch };