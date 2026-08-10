import styles from './Placeholder.module.css';
import clsx from 'clsx';
import type { PlaceholderProps } from './types';
import { Button } from '@shared/ui';

/**
 * Generic placeholder.
 * Supports optional action buttons with routing or callback.
 */
function Placeholder(props: PlaceholderProps) {
	const {
		content: {
			image,
			title,
			description
		},
		action,
		variant = 'inline',
		className
	} = props;

	const actions = action
		? Array.isArray(action) ? action : [action]
		: null;

	return (
		// <div className={styles.placeholder}>
		<div
			className={clsx(
				styles.placeholder,
				styles[variant],
				className
			)}
		>
			{image}

			<div className={styles.textWrapper}>
				<h3>{title}</h3>

				{description && (
					<span className={styles.description}>
						{description}
					</span>
				)}
			</div>

			{actions && (
				<div className={styles.actions}>
					{actions.map(({ label, color, ...rest }) => (
						<Button
							key={label}
							style={{ backgroundColor: color }}
							className={styles.actionButton}
							{...rest}
						>
							{label}
						</Button>
					))}
				</div>
			)}
		</div>
	);
}

export { Placeholder };