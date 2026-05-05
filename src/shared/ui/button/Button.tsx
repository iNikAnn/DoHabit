import styles from './Button.module.css';
import { ButtonIndicator, ButtonProps } from './types';
import { Link } from 'react-router-dom';
import { LuExternalLink } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';
import { IconType } from 'react-icons';

const INDICATOR_ICONS: Record<ButtonIndicator, IconType | null> = {
	arrow: IoIosArrowForward,
	external: LuExternalLink,
	none: null
};

/**
 * Universal Button component.
 * Renders as a <Link> if 'to' prop is provided.
 */
function Button(props: ButtonProps) {
	const {
		type = 'button',
		to,
		state,
		icon,
		children,
		indicator,
		style,
		className,
		...rest
	} = props;

	const classes = `${styles.button} ${className ?? ''}`.trim();
	const Indicator = indicator ? INDICATOR_ICONS[indicator.type] : null;

	const innerContent = (
		<>
			{icon}
			{children}
			{Indicator && <Indicator style={indicator?.style} className={styles.indicator} />}
		</>
	);

	// Render as Link
	if (to) {
		return (
			<Link
				to={to}
				state={state}
				style={style}
				className={classes}
			>
				{innerContent}
			</Link>
		);
	}

	// Render as native Button
	return (
		<button
			type={type}
			style={style}
			className={classes}
			{...rest}
		>
			{innerContent}
		</button>
	);
}

export { Button };