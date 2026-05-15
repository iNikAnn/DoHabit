import { Habit } from '@entities/habit';
import { Note } from '@entities/note';

export type CheckContext = { habits: Habit[]; notes: Note[] };