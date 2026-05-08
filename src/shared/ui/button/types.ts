import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { IconType } from 'react-icons';

interface IconProps {
	[key: string]: unknown;
}

export type ButtonIndicator = 'arrow' | 'external' | 'none';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	to?: string;
	state?: Record<string, unknown>;
	icon?: ReactNode | IconType;
	iconProps?: IconProps;
	children?: ReactNode;
	indicator?: {
		type: ButtonIndicator;
		style?: CSSProperties;
	};
}