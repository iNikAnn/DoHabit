import { create } from 'zustand';
import { DialogState } from './types';

export const useDialogStore = create<DialogState>(
	(set) => ({
		content: null,

		open: (contentObj) => set({ content: contentObj }),
		close: () => set({ content: null })
	})
);