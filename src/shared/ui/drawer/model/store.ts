import { create } from 'zustand';
import { DrawerState } from './types';

export const useDrawerStore = create<DrawerState>(
	(set) => ({
		content: null,

		open: (content) => set({ content: content }),
		close: () => set({ content: null })
	})
);