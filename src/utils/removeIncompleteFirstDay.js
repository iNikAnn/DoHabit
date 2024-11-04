function removeIncompleteFirstDay(completedDays, frequency) {

	if (completedDays[0]?.progress < frequency) {
		completedDays = completedDays.slice(1);
	};

	return completedDays;
}

export default removeIncompleteFirstDay;