import styles from './Button.module.css';
import { ButtonIndicator, ButtonProps } from './types';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuExternalLink } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';
import { renderIcon } from '@shared/lib';

// Motion-enhanced Link
const MotionLink = motion.create(Link);

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
		iconProps,
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
			{renderIcon(icon, iconProps)}
			{children}
			{Indicator && <Indicator style={indicator?.style} className={styles.indicator} />}
		</>
	);

	// Render as Link
	if (to) {
		return (
			<MotionLink
				to={to}
				state={state}
				style={style}
				className={classes}
			>
				{innerContent}
			</MotionLink>
		);
	}

	// Render as native Button
	return (
		<motion.button
			type={type}
			style={style}
			className={classes}
			{...rest}
		>
			{innerContent}
		</motion.button>
	);
}

export { Button };