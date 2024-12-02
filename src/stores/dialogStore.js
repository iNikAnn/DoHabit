import { create } from "zustand";

export const useDialog = create(
	(set) => ({
		isVisible: false,
		content: null,

		open: (contentObj) => set({ isVisible: true, content: contentObj }),
		close: () => set({ isVisible: false, content: null })
	})
);