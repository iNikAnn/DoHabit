import { JSX } from 'react';

export interface PlaceholderContent {
	image?: JSX.Element;
	title: string;
	description: string;
}

export interface PlaceholderAction {
	label: string;
	icon?: JSX.Element;
	color?: string;
	to?: string;
	state?: { modalTitle: string };
	onClick?: () => void;
}

export interface PlaceholderProps {
	content: PlaceholderContent;
	action?: PlaceholderAction;
}