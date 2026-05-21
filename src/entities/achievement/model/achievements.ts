import firstHabitIcon from '../assets/fresh-start.svg';
import mainQuestAbandonedIcon from '../assets/main-quest-abandoned.svg';
import habitVacationOverIcon from '../assets/habit-vacation-over.svg';
import illBeBackIcon from '../assets/ill-be-back.svg';
import overachieverDayIcon from '../assets/overachiever-day.svg';
import perfectDayIcon from '../assets/perfect-day.svg';
import timeTravelerIcon from '../assets/time-traveler.svg';
import newYearsResolutionIcon from '../assets/new-years-resolution.svg';
import accumulatedYearIcon from '../assets/accumulated-year.svg';
import perfectYearIcon from '../assets/perfect-year.svg';

import gravityFallsJournalIcon from '../assets/gravity-falls-journal.svg';
import notTwitterApprovedIcon from '../assets/not-twitter-approved.svg';
import dianeMorningLogIcon from '../assets/diane-morning-log.svg';
import gothamProtectorIcon from '../assets/gotham-protector.svg';
import tolstoyModeIcon from '../assets/tolstoy-mode.svg';

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
		title: 'Fresh Start',
		description: 'Welcome aboard! You have just created your very first habit. Let’s make it stick.',
		icon: firstHabitIcon,
		isSecret: true
	},
	{
		id: 'main-quest-abandoned',
		title: 'The Dragonborn Can Wait',
		description: 'The world is ending, Alduin is here, but you\'ve ignored this habit for 7 days straight. Classic Dragonborn behavior. Let\'s guess, you went to chase butterflies instead?',
		icon: mainQuestAbandonedIcon,
		isSecret: true
	},
	{
		id: 'habit-vacation-over',
		title: 'Habit Formation',
		description: 'You\'ve returned to your habit after a gap of 21+ days. Just a friendly reminder: the rule was to stick with it for 21 days straight to form a habit, not to take a 3-week vacation from it! But hey, welcome back!',
		icon: habitVacationOverIcon,
		isSecret: true
	},
	{
		id: 'ill-be-back',
		title: 'I\'ll Be Back',
		description: 'You\'ve archived 5 habits — because why actually do them when you can just collect?',
		icon: illBeBackIcon,
		isSecret: true
	},
	{
		id: 'overachiever-day',
		title: 'Overachiever of the Day!',
		description: 'Wow, three habits in one day! Who knew you had this much free time? Procrastination looks good on you!',
		icon: overachieverDayIcon,
		isSecret: true
	},
	{
		id: 'perfect-day',
		title: 'Perfect Day!',
		description: 'You\'ve got 3 or more habits, and you\'ve accomplished every single one!',
		icon: perfectDayIcon,
		isSecret: true
	},
	{
		id: 'time-traveler',
		title: 'I Swear I Did It!',
		description: 'You\'ve officially mastered the art of pretending to be productive — five times!',
		icon: timeTravelerIcon,
		isSecret: true
	},
	{
		id: 'new-years-resolution',
		title: 'New Year, New Me',
		description: 'You broke the curse! Started and completed a habit on January 1st while everyone else is still asleep.',
		icon: newYearsResolutionIcon,
		isSecret: true
	},
	{
		id: 'accumulated-year',
		title: 'A Year... Sort Of',
		description: 'You completed a habit 365 times! Sure, there were gaps, weeks of laziness, and existential crises... but hey, mathematically, it adds up to a whole year!',
		icon: accumulatedYearIcon,
		isSecret: true
	},
	{
		id: 'perfect-year',
		title: 'Calendar Conqueror',
		description: '365 days of absolute discipline. You started on January 1st and didn’t miss a single day all year round.',
		icon: perfectYearIcon,
		isSecret: true
	},

] as const;

export const NOTE_ACHIEVEMENTS = [
	{
		id: 'gravity-falls-journal',
		title: 'Journal #4',
		description: 'You are actively writing down your thoughts and anomalies. Somewhere in Oregon, Dipper Pines is desperately trying to find your notebook to solve the mysteries of your life!',
		icon: gravityFallsJournalIcon,
		isSecret: true
	},
	{
		id: 'not-twitter-approved',
		title: 'Not Twitter-Approved',
		description: 'Kudos! You\'ve crafted a note longer than 140 characters. Back in the day, this would never fit in a tweet, but you are free from those ancient limits now. Write on!',
		icon: notTwitterApprovedIcon,
		isSecret: true
	},
	{
		id: 'diane-morning-log',
		title: 'Good Morning, Diane',
		description: '“Diane, 7:30 AM...” You’ve written a note before 9:00. Grab a damn good cup of coffee and a donut — Agent Cooper would definitely approve of your morning routine!',
		icon: dianeMorningLogIcon,
		isSecret: true
	},
	{
		id: 'gotham-protector',
		title: 'The Dark Knight',
		description: 'You wrote a note after 01:00. What\'s keeping you awake? Are you protecting Gotham, or just overthinking again?',
		icon: gothamProtectorIcon,
		isSecret: true
	},
	{
		id: 'tolstoy-mode',
		title: 'War and Peace and More',
		description: 'Impressive! The total character count in your notes could give Leo Tolstoy a run for his money.',
		icon: tolstoyModeIcon,
		isSecret: true
	},
] as const;


export const ACHIEVEMENTS = [
	...HABIT_ACHIEVEMENTS,
	...NOTE_ACHIEVEMENTS
];