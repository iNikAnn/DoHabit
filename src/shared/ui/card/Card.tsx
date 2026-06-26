import styles from './Card.module.css';
import { type ReactNode } from 'react';
import CardHeader from './CardHeader';
import clsx from 'clsx';

interface CardProps {
	title?: string;
	description?: string;
	extra?: ReactNode;
	children: React.ReactNode;
	childrenClassName?: string;
}

function Card(props: CardProps) {
	const {
		title,
		description,
		extra,
		children,
		childrenClassName
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
				<div className={clsx(styles.body, childrenClassName)}>
					{children}
				</div>
			)}
		</div>
	);
}

export { Card };