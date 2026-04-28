import { CSSProperties, JSX } from 'react';
import styles from '../../css/Card.module.css';

// components
import CardHeader from './CardHeader';

interface Props {
	title: string;
	desc?: string;
	icon: JSX.Element | string;
	accentColor?: string;
	contentStyle?: CSSProperties;
	children: React.ReactNode;
}

function Card({ title, desc, icon, accentColor, children, contentStyle }: Props) {
	return (
		<div className={styles.chart}>
			<CardHeader
				title={title}
				desc={desc}
				icon={icon}
				iconColor={accentColor}
			/>

			<div
				style={contentStyle}
				className={styles.childrenWrapepr}
			>
				{children}
			</div>
		</div>
	);
}

export default Card;