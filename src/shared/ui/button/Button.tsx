import styles from './Button.module.css';
import clsx from 'clsx';
import { Link } from 'react-router';
import type { IconType } from 'react-icons';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LuExternalLink } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';
import type { ButtonIndicator, ButtonProps } from './types';
import { renderIcon } from '@shared/lib/react';

// Motion-enhanced Link
const MotionLink = motion.create(Link);

const INDICATOR_ICONS: Record<ButtonIndicator, IconType | null> = {
	arrow: IoIosArrowForward,
	external: LuExternalLink,
	checkmark: FaCheck,
	none: null
};

const whileTap = {
	filter: 'brightness(0.8)',
	scale: 0.98,
	transition: { duration: 0.1 }
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

	// UI localization
	const { t } = useTranslation();

	const classes = clsx(
		styles.button,
		variant && styles[variant],
		className
	);

	const Indicator = indicator ? INDICATOR_ICONS[indicator.type] : null;

	const innerContent = (
		<>
			{renderIcon(icon, { alt: t('common.icon'), ...iconProps })}
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
				whileTap={whileTap}
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
			whileTap={whileTap}
			{...rest}
		>
			{innerContent}
		</motion.button>
	);
}

export { Button };