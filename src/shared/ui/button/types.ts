import type { HTMLMotionProps } from 'framer-motion';
import type { CSSProperties, HTMLAttributeAnchorTarget, ReactNode } from 'react';
import type { IconType } from 'react-icons';

interface IconProps {
	[key: string]: unknown;
}

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger';
export type ButtonIndicator = 'arrow' | 'external' | 'checkmark' | 'none';

export interface ButtonProps extends HTMLMotionProps<'button'> {
	to?: string;
	target?: HTMLAttributeAnchorTarget;
	state?: Record<string, unknown>;
	variant?: ButtonVariant;
	icon?: ReactNode | IconType | string;
	iconProps?: IconProps;
	children?: ReactNode;
	indicator?: {
		type: ButtonIndicator;
		style?: CSSProperties;
	};
}