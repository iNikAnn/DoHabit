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
	{
		id: 13,
		title: 'Cursed by 13',
		desc: 'You\'ve hit the unlucky 13! Your streak ends here!',
		criteria: {
			streak: 13
		},
		isSecret: true
	},
	{
		id: 14,
		title: 'I\'ll Be Back',
		desc: 'You\'ve archived 5 habits — because why actually do them when you can just collect?',
		criteria: {
			count: 5
		},
		isSecret: true
	},
	{
		id: 15,
		title: 'What the Heck?!',
		desc: 'You\'ve unlocked the devil\'s favorite achievement with three streaks of six days each. Who knew consistency could be so... sinister?',
		criteria: {
			streak: 6
		},
		isSecret: true
	},
	{
		// Marks yesterday as complete using the "Complete Y'day" button
		id: 16,
		title: 'I Swear I Did It!',
		desc: 'You\'ve officially mastered the art of pretending to be productive — five times!',
		criteria: {
			count: 5
		},
		isSecret: true
	},
	{
		// Complete all habits (3 or more) on Halloween
		id: 17,
		title: 'Hauntingly Productive!',
		desc: 'You\'ve managed to be productive on the spookiest day of the year. Who knew ghosts could inspire such motivation?',
		criteria: {
			count: 3
		},
		isSecret: true
	},
	{
		// Complete all habits (3 or more) on the last day of the year
		id: 18,
		title: 'New Year, New Victories!',
		desc: 'You\'ve wrapped up the year by completing all your habits! Cheers to new beginnings and endless possibilities ahead!',
		criteria: {
			count: 3
		},
		isSecret: true
	},
	{
		// Create 3 or more habits in one day
		id: 19,
		title: 'Overachiever of the Day!',
		desc: 'Wow, three habits in one day! Who knew you had this much free time? Procrastination looks good on you!',
		criteria: {
			count: 3
		},
		isSecret: true
	},
	{
		// Сomplete the habit on weekends for 4 consecutive weeks
		id: 20,
		title: 'Weekend Warrior',
		desc: 'You\'ve managed to stick to your habit on weekends for 4 weeks straight. Impressive dedication to doing just enough!',
		criteria: {
			streak: 4
		},
		isSecret: true
	},
	{
		// Total number of notes has exceeded a certain amount
		id: 21,
		title: 'The Notes Parade',
		desc: 'You\'ve written 7 notes! Not quite a wizarding world, but at least you\'ve conjured up some thoughts!',
		criteria: {
			count: 7
		},
		isSecret: true
	},
	{
		// A note longer than a certain length exists
		id: 22,
		title: 'Not Twitter-Approved',
		desc: 'Kudos! You\'ve crafted a note longer than 140 characters. Apparently, you have a lot more to say than what fits in a tweet!',
		criteria: {
			length: 140
		},
		isSecret: true
	},
	{
		// The total character count in notes has exceeded a certain number
		id: 23,
		title: 'War and More',
		desc: 'Impressive! Your notes have reached a character count that could give Tolstoy a run for his money. Who knew you were such a wordsmith?',
		criteria: {
			count: 2500
		},
		isSecret: true
	},
	{
		// Achievement for writing a note in the morning before 9 AM
		id: 25,
		title: 'Thoughts on the Run',
		desc: 'Bravo! You\'ve written a note before 9 AM. Better hurry — those brilliant ideas have a tendency to vanish before breakfast!',
		criteria: {
			hours: 9
		},
		isSecret: true
	}
];

export default achievements;