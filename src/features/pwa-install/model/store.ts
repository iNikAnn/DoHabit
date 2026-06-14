import { create } from 'zustand';

export interface BeforeInstallPromptEvent extends Event {
	userChoice: Promise<{
		outcome: 'accepted' | 'dismissed';
	}>;
	prompt: () => Promise<void>;
}

interface PwaStoreState {
	deferredPrompt: BeforeInstallPromptEvent | null;
	setDeferredPrompt: (prompt: BeforeInstallPromptEvent | null) => void;
}

/**
 * Global PWA installation manager.
 * Captures browser installation prompts on startup to enable custom installation triggers.
 */
export const usePwaStore = create<PwaStoreState>()(
	(set) => ({
		deferredPrompt: null,
		setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt })
	})
);

export const pwaStore = usePwaStore;