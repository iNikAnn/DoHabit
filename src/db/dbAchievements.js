// New achievements should be added to the end of the list
// Do not change the ids of remaining elements when removing an item

const achievements = [
	{
		id: 0,
		title: '7 Days',
		desc: 'Maintain your habit for 7 consecutive days.',
		criteria: {
			streak: 7
		},
		isSecret: false
	},
	{
		id: 1,
		title: '15 Days',
		desc: 'Maintain your habit for 15 consecutive days.',
		criteria: {
			streak: 15
		},
		isSecret: false
	},
	{
		id: 2,
		title: '30 Days',
		desc: 'Maintain your habit for 30 consecutive days.',
		criteria: {
			streak: 30
		},
		isSecret: false
	},
	{
		id: 3,
		title: '90 Days',
		desc: 'Maintain your habit for 90 consecutive days.',
		criteria: {
			streak: 90
		},
		isSecret: false
	},
	{
		id: 4,
		title: '180 Days',
		desc: 'Maintain your habit for 180 consecutive days.',
		criteria: {
			streak: 180
		},
		isSecret: false,
	},
	{
		id: 5,
		title: '365 Days',
		desc: 'Maintain your habit for 365 consecutive days.',
		criteria: {
			streak: 365
		},
		isSecret: false
	},
	{
		id: 6,
		title: 'Oops, I Did It Again!',
		desc: 'Complete a day after a 30-day or longer break.',
		criteria: {
			gap: 30
		},
		isSecret: true
	},
	{
		id: 7,
		title: 'Habit Formation',
		desc: 'You\'ve returned to your habit after a 21-day break. Just a little reminder: the idea was to stick with it for 21 days straight to form a habit, not to take a vacation from it! But hey, at least you\'re back!',
		criteria: {
			gap: 21
		},
		isSecret: true
	},
	{
		id: 8,
		title: 'I Swear I\'ll Start... Eventually',
		desc: 'You\'ve created a habit but haven\'t completed it in 7 or more days. A reminder that starting is often the hardest part!',
		criteria: {
			gap: 5
		},
		isSecret: true
	},
	{
		id: 9,
		title: 'One Day Wonder',
		desc: 'Create a habit on January 1st and actually complete it on the same day.',
		isSecret: true
	},
	{
		id: 10,
		title: 'Stubborn as a Mule',
		desc: 'Complete your habit 500 times! Sure, it\'s not a streak, but who cares? Just think of it as 500 reminders that you\'re really, really committed... or just really stubborn!',
		criteria: {
			count: 500
		},
		isSecret: true
	},
	{
		id: 11,
		title: 'Calendar Conqueror',
		desc: 'Complete a full year of daily tasks, starting from January 1st. You\'ve mastered the calendar!',
		isSecret: true
	},
	{
		id: 12,
		title: 'Living the Dream',
		desc: 'You\'ve got 5 or more habits, and you\'ve accomplished every single one!',
		criteria: {
			count: 5
		},
		isSecret: true
	},
];

export default achievements;