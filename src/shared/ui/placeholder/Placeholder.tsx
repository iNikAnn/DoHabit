import styles from './Placeholder.module.css';
import { Link, useLocation } from 'react-router-dom';
import { PlaceholderProps } from './types';
import Button from '../../../components/Button';

/**
 * Generic placeholder for empty states.
 * Supports optional action button with routing or callback.
 */
function Placeholder(props: PlaceholderProps) {
	const {
		content,
		action
	} = props;

	const location = useLocation();

	return (
		<div className={styles.placeholder}>
			{content.image}

			<div className={styles.textWrapper}>
				<h3>{content.title}</h3>

				<span className={styles.desc}>
					{content.description}
				</span>
			</div>

			{action && (
				<Link
					to={action.to ?? location.pathname}
					state={action.state}
				>
					<Button
						icon={action.icon}
						text={action.label}
						bgColor={action.color}
						onClick={action.onClick}
					/>
				</Link>
			)}
		</div>
	);
}

export { Placeholder };