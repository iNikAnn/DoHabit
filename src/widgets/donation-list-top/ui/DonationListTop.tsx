import { useTranslation } from 'react-i18next';
import { FaMedal, FaTrophy } from 'react-icons/fa';
import { DonationStatus, useDonations } from '@entities/donation';
import { List, type ListItemProps } from '@shared/ui';

const TOP_REWARDS: Record<number, React.ReactNode> = {
	0: <FaTrophy color="#d7c247" />, // Gold
	1: <FaMedal color="#C0C0C0" />,  // Silver
	2: <FaMedal color="#d2863a" />   // Bronze
};

/**
 * The leaderboard widget showing top donors.
 */
function DonationListTop() {
	const { t } = useTranslation();

	// Fetch aggregated top donations data
	const { data, isPending, isError } = useDonations('top');

	// Format query results for list component
	const donations: ListItemProps[] = data
		? data.map((donation, index) => ({
			icon: index < 3
				? TOP_REWARDS[index]
				: (
					<div style={{
						width: '26px',
						height: '26px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 'var(--border-radius-tertiary)',
						backgroundColor: 'var(--bg-color-secondary)',
						color: 'var(--color-secondary)',
						fontWeight: 'bold'
					}}>
						{index + 1}
					</div>
				),
			title: donation.username ?? 'username',
			description: donation.message ?? undefined,
			extra: donation.amount
		}))
		: [];


	return (
		<DonationStatus
			isPending={isPending}
			isError={isError}
			isEmpty={donations.length === 0}
		>
			<List
				title={t('support.allTimeTopTitle')}
				items={donations}
			/>
		</DonationStatus>
	);
}

export { DonationListTop };