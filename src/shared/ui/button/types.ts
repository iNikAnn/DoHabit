import type { HTMLMotionProps } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import type { IconType } from 'react-icons';

interface IconProps {
	[key: string]: unknown;
}

export type ButtonVariant = 'secondary' | 'text' | 'danger';
export type ButtonIndicator = 'arrow' | 'external' | 'checkmark' | 'none';

export interface ButtonProps extends HTMLMotionProps<'button'> {
	to?: string;
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