import { create } from 'zustand';
import type { DrawerState } from './types';

export const useDrawerStore = create<DrawerState>(
	(set) => ({
		content: null,

		open: (content) => set({ content: content }),
		close: () => set({ content: null })
	})
);