import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import { del, get, set } from 'idb-keyval';
import type { UserState } from './types';
import { STORAGE_KEYS } from '@shared/const';

const isDev = import.meta.env.DEV;

const idbStorage: PersistStorage<unknown> = {
	getItem: async (key) => {
		return (await get(key)) ?? null;
	},

	setItem: async (key, value) => {
		await set(key, value);
	},

	removeItem: async (key) => {
		await del(key);
	}
};

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: {
				clientId: isDev ? 'DEV_CLIENT_ID' : crypto.randomUUID(),
				createdAt: Date.now()
			},

			updateUser: (data) => set((state) => ({
				user: { ...state.user, ...data },
			})),

			_hasHydrated: false,
			setHasHydrated: (state) => set(() => ({ _hasHydrated: state }))
		}),
		{
			name: STORAGE_KEYS.USER,
			storage: idbStorage,
			version: 0,

			partialize: (s) => ({
				user: s.user
			}),

			onRehydrateStorage: () => (s) => {
				s?.setHasHydrated(true);
			}
		}
	)
);