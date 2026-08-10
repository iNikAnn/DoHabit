import styles from './DonationPaymentDetails.module.css';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import CheckStatusButton from '../check-status-button/CheckStatusButton';
import { SUPPORTED_CURRENCIES } from '../../model/constants';
import type { PaymentData, PaymentStatus } from '../../model/types';
import { copyToClipboard } from '@shared/lib/dom';
import { Button } from '@shared/ui';

interface DonationPaymentDetailsProps {
	data: PaymentData;
	status: string;
	onStatusChange: (status: PaymentStatus) => void;
	onClose: () => void;
}

/**
 * Display payment details.
 */
function DonationPaymentDetails(props: DonationPaymentDetailsProps) {
	const {
		data,
		status,
		onStatusChange,
		onClose
	} = props;

	const { t } = useTranslation();
	const { orderId, payAddress, payAmount, payCurrency } = data;

	const currencyInfo = SUPPORTED_CURRENCIES[payCurrency];

	const handleCopy = async (text: string) => {
		const success = await copyToClipboard({ text });

		if (success) {
			toast.success(t('support.notifications.copySuccess'));
		} else {
			toast.error(t('support.notifications.copyError'));
		}
	};

	return (
		<div className={styles.container}>
			{/* Amount */}
			<div className={styles.amountBlock}>
				<div>
					<h3 className={styles.amount}>
						{payAmount}
					</h3>

					<span className={styles.amountDescription}>
						{`${currencyInfo?.label} · ${currencyInfo?.network}`}
					</span>
				</div>

				<Button
					variant='text'
					onClick={() => handleCopy(String(payAmount))}
				>
					{t('support.actions.copyAmount')}
				</Button>
			</div>

			{/* Address */}
			<div className={styles.addressBlock}>
				<div className={styles.status}>
					{`${t('common.status')}: ${status}`}
				</div>

				<div className={styles.qrWrapper}>
					<QRCode
						size={256}
						level='M'
						style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
						value={payAddress}
						viewBox={`0 0 256 256`}
					/>
				</div>

				<div className={styles.address}>
					{payAddress}
				</div>

				<Button
					variant='text'
					onClick={() => handleCopy(payAddress)}
				>
					{t('support.actions.copyAddress')}
				</Button>
			</div>

			{/* Actions */}
			<div className={styles.actions}>
				<Button
					variant='secondary'
					style={{ flex: 1 }}
					onClick={onClose}
				>
					{t('common.close')}
				</Button>

				<CheckStatusButton
					orderId={orderId}
					onStatusChange={onStatusChange}
				/>
			</div>
		</div>
	);
}

export default DonationPaymentDetails;