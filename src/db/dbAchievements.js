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
		isUnlocked: false,
		isSecret: false
	},
	{
		id: 1,
		title: '15 Days',
		desc: 'Maintain your habit for 15 consecutive days.',
		criteria: {
			streak: 15
		},
		isUnlocked: false,
		isSecret: false
	},
	{
		id: 2,
		title: '30 Days',
		desc: 'Maintain your habit for 30 consecutive days.',
		criteria: {
			streak: 30
		},
		isUnlocked: false,
		isSecret: false
	},
	{
		id: 3,
		title: '90 Days',
		desc: 'Maintain your habit for 90 consecutive days.',
		criteria: {
			streak: 90
		},
		isUnlocked: false,
		isSecret: false
	},
	{
		id: 4,
		title: '180 Days',
		desc: 'Maintain your habit for 180 consecutive days.',
		criteria: {
			streak: 180
		},
		isUnlocked: false,
		isSecret: false,
	},
	{
		id: 5,
		title: '365 Days',
		desc: 'Maintain your habit for 365 consecutive days.',
		criteria: {
			streak: 365
		},
		isUnlocked: false,
		isSecret: false
	},
];

export default achievements;