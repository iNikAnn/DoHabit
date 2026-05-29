interface TimelineItem {
	createdAt: number;
}

interface ExtractYearsOptions {
	/** The desired sorting order of the returned years. */
	order?: 'asc' | 'desc';
}

/**
 * Extracts unique years from timeline items.
 */
function extractYearsFromTimeline(
	items: TimelineItem[],
	options: ExtractYearsOptions = {}
): number[] {
	const { order } = options;
	const date = new Date();
	const uniqueYears = new Set<number>();

	for (const item of items) {
		date.setTime(item.createdAt);
		uniqueYears.add(date.getFullYear());
	}

	const result = Array.from(uniqueYears);

	if (order) {
		result.sort((a, b) => (order === 'desc' ? b - a : a - b));
	}

	return result;
}

export { extractYearsFromTimeline };