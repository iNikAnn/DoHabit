import { create } from 'zustand';

// types
import { DialogState } from '../types/dialog';

export const useDialogStore = create<DialogState>(
	(set) => ({
		isVisible: false,
		content: null,

		open: (contentObj) => set({ isVisible: true, content: contentObj }),
		close: () => set({ isVisible: false })
	})
);