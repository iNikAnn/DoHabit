import styles from './Switch.module.css';
import clsx from 'clsx';

interface Props {
	isActive: boolean;
	disabled?: boolean;
	onClick: (...args: any) => void;
}

/**
 * Toggle switch component.
 */
function Switch({ isActive, disabled, onClick }: Props) {
	return (
		<label
			className={clsx(
				styles.switch,
				disabled && styles.disabled
			)}
			onClick={(e) => e.stopPropagation()}
			onPointerDownCapture={((e) => e.stopPropagation())}
		>
			<input
				type='checkbox'
				className={styles.input}
				checked={isActive}
				onChange={onClick}
				{...{ switch: '' } as any}
				disabled={disabled}
			/>

			<div className={clsx(
				styles.indicator,
				isActive && styles.active
			)} />
		</label>
	);
}

export { Switch };