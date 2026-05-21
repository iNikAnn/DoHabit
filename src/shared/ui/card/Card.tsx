import styles from './Card.module.css';
import { ReactNode } from 'react';
import CardHeader from './CardHeader';

interface CardProps {
	title: string;
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
			<CardHeader
				title={title}
				description={description}
				extra={extra}
			/>

			<div className={styles.childrenWrapepr}>
				{children}
			</div>
		</div>
	);
}

export { Card };