import styles from './SectionHeader.module.css';
import { startCase } from 'es-toolkit';
import { CSSProperties, ReactNode } from 'react';

interface Props {
	title: string
	titleStyle?: CSSProperties;
	extra?: ReactNode;
}

/**
 * Generic layout component that displays a section title
 * with an optional extra slot on the opposite side.
 */
function SectionHeader(props: Props) {
	const {
		title,
		titleStyle,
		extra
	} = props;

	return (
		<div className={styles.header}>
			<h4
				style={titleStyle}
				className={styles.title}
			>
				{startCase(title)}
			</h4>

			{extra && (
				<div className={styles.extraWrapper}>
					{extra}
				</div>
			)}
		</div>
	);
}

export { SectionHeader };