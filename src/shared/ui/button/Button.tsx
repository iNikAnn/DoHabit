import styles from './Button.module.css';
import type { ButtonIndicator, ButtonProps } from './types';
import type { IconType } from 'react-icons';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { LuExternalLink } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';
import { renderIcon } from '@shared/lib/react';

// Motion-enhanced Link
const MotionLink = motion.create(Link);

const INDICATOR_ICONS: Record<ButtonIndicator, IconType | null> = {
	arrow: IoIosArrowForward,
	external: LuExternalLink,
	checkmark: FaCheck,
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
		variant,
		icon,
		iconProps,
		children,
		indicator,
		style,
		className,
		...rest
	} = props;

	const classes = `${styles.button} ${styles[variant ?? '']} ${className ?? ''}`.trim();
	const Indicator = indicator ? INDICATOR_ICONS[indicator.type] : null;

	const innerContent = (
		<>
			{typeof icon === 'string'
				? <img src={icon} alt='icon' />
				: renderIcon(icon, iconProps)}
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