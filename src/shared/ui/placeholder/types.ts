import { type ReactNode } from 'react';

export interface PlaceholderContent {
	image?: ReactNode;
	title: string;
	description: string;
}

export interface PlaceholderAction {
	label: string;
	icon?: ReactNode;
	color?: string;
	to?: string;
	state?: { modalTitle: string };
	onClick?: () => void;
}

export interface PlaceholderProps {
	content: PlaceholderContent;
	action?: PlaceholderAction | PlaceholderAction[];
}