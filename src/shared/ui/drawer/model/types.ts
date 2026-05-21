import { ButtonProps } from '@shared/ui';

export interface DrawerAction extends ButtonProps {
	label: string;
}

export interface DrawerContent {
	title: string;
	actions?: DrawerAction[];
}

export interface DrawerState {
	content?: DrawerContent | null;
	open: (content: DrawerContent) => void;
	close: () => void;
}