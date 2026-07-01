import { type ReactNode } from 'react';
import type { ButtonProps } from '../button/types';

export interface PlaceholderContent {
	image?: ReactNode;
	title: string;
	description: string;
}

export interface PlaceholderAction extends ButtonProps {
	label: string;
	color?: string;
}

export interface PlaceholderProps {
	content: PlaceholderContent;
	action?: PlaceholderAction | PlaceholderAction[];
}