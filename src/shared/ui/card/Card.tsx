import styles from './Card.module.css';
import { type ReactNode } from 'react';
import CardHeader from './CardHeader';

interface CardProps {
	title?: string;
	description?: string;
	extra?: ReactNode;
	children: React.ReactNode;
}

function Card(props: CardProps) {
	const {
		title,
		description,
		extra,
		children
	} = props;

	return (
		<div className={styles.card}>
			{title && (
				<CardHeader
					title={title}
					description={description}
					extra={extra}
				/>
			)}

			{children && (
				<div>
					{children}
				</div>
			)}
		</div>
	);
}

export { Card };