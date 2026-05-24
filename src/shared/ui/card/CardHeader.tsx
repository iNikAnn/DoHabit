import styles from './CardHeader.module.css';
import { type ReactNode } from 'react';

interface CardHeaderProps {
	title: string;
	description?: string;
	extra?: ReactNode;
}

function CardHeader(props: CardHeaderProps) {
	const {
		title,
		description,
		extra
	} = props;

	return (
		<div>
			<div className={styles.top}>
				<h3>{title}</h3>

				{extra && (
					<div className={styles.extra}>
						{extra}
					</div>
				)}
			</div>

			{description && (
				<div className={styles.description}>
					<small>
						{description}
					</small>
				</div>
			)}
		</div>
	);
}

export default CardHeader;