import { useTranslation } from 'react-i18next';
import { Placeholder } from '@shared/ui';

interface DonationStatusProps {
	isPending: boolean;
	isError: boolean;
	isEmpty: boolean;
	children: React.ReactNode;
}

/**
 * Render appropriate placeholder for loading, error, or empty donation states.
 */
function DonationStatus(props: DonationStatusProps) {
	const {
		isPending,
		isError,
		isEmpty,
		children
	} = props;

	const { t } = useTranslation();

	if (isPending) {
		return <Placeholder content={{ title: t('common.loading') }} variant='absolute' />;
	}

	if (isError) {
		return (
			<Placeholder
				content={{
					title: t('support.errorTitle'),
					description: t('support.errorDescription'),
				}}
				variant='absolute'
			/>
		);
	}

	if (isEmpty) {
		return (
			<Placeholder
				content={{
					title: t('support.emptyTitle'),
					description: t('support.emptyDescription'),
				}}
				variant='absolute'
			/>
		);
	}

	return <>{children}</>;
}

export { DonationStatus };