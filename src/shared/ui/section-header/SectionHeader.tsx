import styles from './SectionHeader.module.css';
import { startCase } from 'es-toolkit';
import { CSSProperties, ReactNode } from 'react';

interface Props {
	title: string
	titleStyle?: CSSProperties;
	action?: ReactNode;
}

/**
 * Generic layout component that displays a section title
 * with an optional action slot on the opposite side.
 */
function SectionHeader(props: Props) {
	const {
		title,
		titleStyle,
		action
	} = props;

	return (
		<div className={styles.header}>
			<h4
				style={titleStyle}
				className={styles.title}
			>
				{startCase(title)}
			</h4>

			{action && (
				<div className={styles.actionWrapper}>
					{action}
				</div>
			)}
		</div>
	);
}

export { SectionHeader };