import firstHabitIcon from '../assets/fresh-start.svg';
import mainQuestAbandonedIcon from '../assets/main-quest-abandoned.svg';
import habitVacationOverIcon from '../assets/habit-vacation-over.svg';
import firstArchiveIcon from '../assets/first-archive.svg';
import illBeBackIcon from '../assets/ill-be-back.svg';
import overachieverDayIcon from '../assets/overachiever-day.svg';
import perfectDayIcon from '../assets/perfect-day.svg';
import timeTravelerIcon from '../assets/time-traveler.svg';
import newYearsResolutionIcon from '../assets/new-years-resolution.svg';
import accumulatedYearIcon from '../assets/accumulated-year.svg';
import perfectYearIcon from '../assets/perfect-year.svg';

import firstNoteIcon from '../assets/first-note.svg';
import gravityFallsJournalIcon from '../assets/gravity-falls-journal.svg';
import notTwitterApprovedIcon from '../assets/not-twitter-approved.svg';
import dianeMorningLogIcon from '../assets/diane-morning-log.svg';
import gothamProtectorIcon from '../assets/gotham-protector.svg';
import tolstoyModeIcon from '../assets/tolstoy-mode.svg';

import compactCalendarIcon from '../assets/compact-calendar.svg';
import storageInfoIcon from '../assets/storage_info.svg';

import type { Achievement } from './types';

export const HABIT_ACHIEVEMENTS = [
	// {
	// 	id: 0,
	// 	title: '7 Days',
	// 	desc: 'Maintain your habit for 7 consecutive days.',
	// 	criteria: {
	// 		streak: 7
	// 	},
	// 	isSecret: false
	// },
	// {
	// 	id: 1,
	// 	title: '15 Days',
	// 	desc: 'Maintain your habit for 15 consecutive days.',
	// 	criteria: {
	// 		streak: 15
	// 	},
	// 	isSecret: false
	// },
	// {
	// 	id: 2,
	// 	title: '30 Days',
	// 	desc: 'Maintain your habit for 30 consecutive days.',
	// 	criteria: {
	// 		streak: 30
	// 	},
	// 	isSecret: false
	// },
	// {
	// 	id: 3,
	// 	title: '90 Days',
	// 	desc: 'Maintain your habit for 90 consecutive days.',
	// 	criteria: {
	// 		streak: 90
	// 	},
	// 	isSecret: false
	// },
	// {
	// 	id: 4,
	// 	title: '180 Days',
	// 	desc: 'Maintain your habit for 180 consecutive days.',
	// 	criteria: {
	// 		streak: 180
	// 	},
	// 	isSecret: false,
	// },
	// {
	// 	id: 5,
	// 	title: '365 Days',
	// 	desc: 'Maintain your habit for 365 consecutive days.',
	// 	criteria: {
	// 		streak: 365
	// 	},
	// 	isSecret: false
	// },

	{
		id: 'fresh-start',
		icon: firstHabitIcon,
	},
	{
		id: 'main-quest-abandoned',
		icon: mainQuestAbandonedIcon,
		isSecret: true
	},
	{
		id: 'habit-vacation-over',
		icon: habitVacationOverIcon,
		isSecret: true
	},
	{
		id: 'first-archive',
		icon: firstArchiveIcon
	},
	{
		id: 'ill-be-back',
		icon: illBeBackIcon,
		isSecret: true
	},
	{
		id: 'overachiever-day',
		icon: overachieverDayIcon,
		isSecret: true
	},
	{
		id: 'perfect-day',
		icon: perfectDayIcon,
		isSecret: true
	},
	{
		id: 'time-traveler',
		icon: timeTravelerIcon,
		isSecret: true
	},
	{
		id: 'new-years-resolution',
		icon: newYearsResolutionIcon,
		isSecret: true
	},
	{
		id: 'accumulated-year',
		icon: accumulatedYearIcon,
		isSecret: true
	},
	{
		id: 'perfect-year',
		icon: perfectYearIcon,
		isSecret: true
	},

] as const;

export const NOTE_ACHIEVEMENTS = [
	{
		id: 'first-note',
		icon: firstNoteIcon
	},
	{
		id: 'gravity-falls-journal',
		icon: gravityFallsJournalIcon,
		isSecret: true
	},
	{
		id: 'not-twitter-approved',
		icon: notTwitterApprovedIcon,
		isSecret: true
	},
	{
		id: 'diane-morning-log',
		icon: dianeMorningLogIcon,
		isSecret: true
	},
	{
		id: 'gotham-protector',
		icon: gothamProtectorIcon,
		isSecret: true
	},
	{
		id: 'tolstoy-mode',
		icon: tolstoyModeIcon,
		isSecret: true
	},
] as const;

export const OTHER_ACHIEVEMENTS = [
	{
		id: 'compact-calendar',
		icon: compactCalendarIcon
	},
	{
		id: 'storage_info',
		icon: storageInfoIcon
	}
] as const;

export const ACHIEVEMENTS = [
	...HABIT_ACHIEVEMENTS,
	...NOTE_ACHIEVEMENTS,
	...OTHER_ACHIEVEMENTS
] as Achievement[];