import type { Note } from '@entities/note';
import { create } from 'zustand';

interface NoteFormState {
	isOpen: boolean;
	draftText: string;
	editingNoteId: string | null;
	openCreate: () => void;
	openEdit: (note: Note) => void;
	setDraftText: (text: string) => void;
	closeForm: (clearDraftText?: boolean) => void;
}

export const useNoteFormStore = create<NoteFormState>()(
	(set) => ({
		isOpen: false,
		draftText: '',
		editingNoteId: null,

		openCreate: () => set(() => ({ isOpen: true, editingNoteId: null })),

		openEdit: (note) => set(() => ({
			isOpen: true,
			editingNoteId: note.id,
			draftText: note.text
		})),

		setDraftText: (text) => set(() => ({ draftText: text })),

		closeForm: (clearDraftText) => set((s) => ({
			isOpen: false,
			draftText: clearDraftText ? '' : s.draftText
		}))
	})
);