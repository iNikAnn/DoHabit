import styles from '../../css/SectionHeader.module.css';

// components
import TextButton from '../Actions/TextButton';
import IconButton from '../Actions/IconButton';

// types
import { CSSProperties, JSX } from 'react';

// utils
import { startCase } from 'es-toolkit';

interface Props {
	title: string
	titleStyle?: CSSProperties;
	button?: {
		variant: 'text' | 'icon';
		text: string;
		icon?: JSX.Element;
		onClick: (...args: any) => void;
	}
}

function SectionHeader({ title, titleStyle, button }: Props) {
	return (
		<div className={styles.header}>
			<h4
				style={titleStyle}
				className={styles.title}
			>
				{startCase(title)}
			</h4>

			{button && (
				button.variant === 'text'
					? <TextButton {...button} />
					// @ts-ignore
					: <IconButton {...button} />
			)}
		</div>
	);
}

export default SectionHeader;