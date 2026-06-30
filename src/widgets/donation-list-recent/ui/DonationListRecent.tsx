import { useTranslation } from 'react-i18next';
import { DonationStatus, useDonations } from '@entities/donation';
import { List, type ListItemProps } from '@shared/ui';

/**
 * Render a list of the most recent donations.
 */
function DonationListRecent() {
	const { t } = useTranslation();

	// Fetch aggregated top donations data
	const { data, isPending, isError } = useDonations('recent');

	// Format query results for list component
	const donations: ListItemProps[] = data
		? data.map((donation) => ({
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
				title={t('support.recentTitle')}
				items={donations}
			/>
		</DonationStatus>
	);
}

export { DonationListRecent };