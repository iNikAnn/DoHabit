export interface DialogContent {
	title?: string;
	subTitle?: string;
	imgSrc?: string;
	text?: string;
}

export interface DialogState {
	content?: DialogContent | null;
	open: (content: DialogContent) => void;
	close: () => void;
}