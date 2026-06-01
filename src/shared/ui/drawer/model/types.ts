import { type ButtonProps } from '@shared/ui';
import type { PlaceholderProps } from '@shared/ui/placeholder/types';

export interface DrawerAction extends ButtonProps {
	label: string;
}

export interface DrawerContent {
	title: string;
	actions?: DrawerAction[];
	placeholder?: PlaceholderProps
}

export interface DrawerState {
	content?: DrawerContent | null;
	open: (content: DrawerContent) => void;
	close: () => void;
}