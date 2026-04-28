import styles from '../../css/CardHeader.module.css';
import { JSX } from 'react';

interface Props {
	title: string;
	desc?: string;
	icon: JSX.Element | string;
	iconColor?: string;
}

function CardHeader({ title, desc, icon, iconColor }: Props) {
	return (
		<div>
			<div className={styles.top}>
				<h3>{title}</h3>

				<span
					className={styles.iconWrapper}
					style={{ color: iconColor }}
				>
					{icon}
				</span>
			</div>

			{desc && (
				<div className={styles.desc}>
					<small>
						{desc}
					</small>
				</div>
			)}
		</div>
	);
}

export default CardHeader;