import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { FaMedal, FaTrophy } from 'react-icons/fa';
import type { Donation } from '@entities/donation';
import { List, Placeholder, type ListItemProps } from '@shared/ui';

const TOP_REWARDS: Record<number, React.ReactNode> = {
	0: <FaTrophy color="#e7d049" />, // Gold
	1: <FaMedal color="#C0C0C0" />,  // Silver
	2: <FaMedal color="#d2863a" />   // Bronze
};

/**
 * The leaderboard widget showing top donors.
 */
function DonationListTop() {
	const { t } = useTranslation();

	// Fetch aggregated top donations data
	const { data, isPending, isError } = useQuery({
		queryKey: ['donations-top'],
		queryFn: async () => {
			const res = await fetch('/api/donations/top');
			if (!res.ok) throw new Error('Fetch failed');

			return await res.json() as Partial<Donation>[];
		},
		staleTime: 1000 * 60 * 60, // 1 hour
		gcTime: 1000 * 60 * 60,    // 1 hour
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	// Format query results for list component
	const donations: ListItemProps[] = data
		? data.map((donation, index) => ({
			icon: TOP_REWARDS[index],
			title: donation.username ?? 'username',
			description: donation.message ?? undefined,
			extra: donation.amount
		}))
		: [];

	// 1. Display state during network request
	if (isPending) {
		return (
			<Placeholder
				content={{
					title: t('common.loading')
				}}
			/>
		);
	}

	// 2. Display state when no data or request fails
	if (donations.length === 0 || isError) {
		return (
			<Placeholder
				content={{
					title: isError
						? t('support.emptyTitle')
						: t('support.errorTitle'),
					description: isError
						? t('support.emptyDescription')
						: t('support.errorDescription')
				}}
			/>
		);
	}

	// 3. Render list
	return (
		<div>
			{donations.length > 0 && (
				<List
					title={t('support.allTimeTopTitle')}
					items={donations}
				/>
			)}
		</div>
	);
}

export { DonationListTop };