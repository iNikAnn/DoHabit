import { create } from 'zustand';
import { DialogState } from './types';

export const useDialogStore = create<DialogState>(
	(set) => ({
		content: null,

		open: (content) => set({ content: content }),
		close: () => set({ content: null })
	})
);