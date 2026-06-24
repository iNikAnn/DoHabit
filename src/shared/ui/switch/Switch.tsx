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
		<label className={styles.switch}>
			<input
				type='checkbox'
				className={styles.input}
				checked={isActive}
				onChange={onClick}
				{...{ switch: '' } as any}
			/>
			<div className={clsx(
				styles.indicator,
				isActive && styles.active
			)} />
		</label>
	);
}

export { Switch };