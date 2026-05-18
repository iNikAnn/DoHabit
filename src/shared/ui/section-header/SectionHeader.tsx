import styles from './SectionHeader.module.css';
import { startCase } from 'es-toolkit';
import { CSSProperties, ReactNode } from 'react';

interface Props {
	title: string
	description?: string;
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
		description,
		titleStyle,
		extra
	} = props;

	return (
		<div className={styles.header}>
			<div>
				<h4
					style={titleStyle}
					className={styles.title}
				>
					{startCase(title)}
				</h4>

				{description && (
					<small className={styles.description}>
						{description}
					</small>
				)}
			</div>

			{extra && (
				<div className={styles.extraWrapper}>
					{extra}
				</div>
			)}
		</div>
	);
}

export { SectionHeader };