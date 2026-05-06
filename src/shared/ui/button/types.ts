import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export type ButtonIndicator = 'arrow' | 'external' | 'none';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	to?: string;
	state?: Record<string, unknown>;
	icon?: ReactNode;
	children?: ReactNode;
	indicator?: {
		type: ButtonIndicator;
		style?: CSSProperties;
	};
}