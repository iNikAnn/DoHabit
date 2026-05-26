import type { ButtonProps } from '@shared/ui';

export interface DialogAction extends ButtonProps {
	label: string;
}

export interface DialogContent {
	title?: string;
	subTitle?: string;
	imgSrc?: string;
	text?: string;
	actions?: DialogAction[];
}

export interface DialogState {
	content?: DialogContent | null;
	open: (content: DialogContent) => void;
	close: () => void;
}