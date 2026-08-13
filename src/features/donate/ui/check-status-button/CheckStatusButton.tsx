import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { checkDonationStatus } from '../../api/checkDonationStatus';
import type { PaymentStatus } from '@features/donate/model/types';
import { Button } from '@shared/ui';

interface CheckStatusButtonProps {
	orderId: string;
	onStatusChange: (status: PaymentStatus) => void;
}

const COOLDOWN_SECONDS = 30;

/**
 * Button that triggers a manual donation status check.
 */
function CheckStatusButton(props: CheckStatusButtonProps) {
	const {
		orderId,
		onStatusChange
	} = props;

	const { t } = useTranslation();
	const queryClient = useQueryClient();

	const [isLoading, setIsLoading] = useState(false);
	const [cooldownSeconds, setCooldownSeconds] = useState(0);

	// Ref to prevent state updates on unmounted component
	const isMountedRef = useRef(true);

	useEffect(() => {
		return () => { isMountedRef.current = false };
	}, []);

	// Handle 1-second interval countdown during cooldown period
	useEffect(() => {
		if (cooldownSeconds > 0) {
			const interval = setInterval(() => {
				setCooldownSeconds((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [cooldownSeconds]);

	/**
	 * Request donation status from API and trigger cooldown lock.
	 */
	const handleCheckStatus = async () => {
		if (isLoading || cooldownSeconds > 0) return;

		setIsLoading(true);

		try {
			const status = await checkDonationStatus(orderId);

			if (isMountedRef.current) {
				onStatusChange(status);
				toast.info(t('support.notifications.statusChecked', { status }));

				// Revalidate donations cache to reflect new payment in lists
				if (status === 'finished') {
					queryClient.invalidateQueries({ queryKey: ['donations'] });
				}
			}
		} catch (error) {
			console.error('Status check failed:', error);

			if (isMountedRef.current) {
				toast.error(t('support.notifications.statusCheckError'));
			}
		} finally {
			if (isMountedRef.current) {
				setIsLoading(false);
				setCooldownSeconds(COOLDOWN_SECONDS);
			}
		}
	};

	/**
	 * Resolve button label based on current request/cooldown state.
	 */
	const getButtonText = () => {
		if (isLoading) return t('support.actions.checkingStatus');
		if (cooldownSeconds > 0) return t('support.actions.cooldownStatus', { seconds: cooldownSeconds });
		return t('support.actions.checkStatus');
	};

	const isDisabled = isLoading || cooldownSeconds > 0;

	return (
		<Button
			style={{ flex: 2 }}
			onClick={handleCheckStatus}
			disabled={isDisabled}
		>
			{getButtonText()}
		</Button>
	);
}

export default CheckStatusButton;