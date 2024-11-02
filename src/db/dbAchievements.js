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
		desc: 'Complete a day after a 30-day break.',
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
];

export default achievements;