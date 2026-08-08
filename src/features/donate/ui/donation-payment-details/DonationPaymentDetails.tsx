import styles from './DonationPaymentDetails.module.css';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import CheckStatusButton from '../check-status-button/CheckStatusButton';
import { copyToClipboard } from '@shared/lib/dom';
import { Button } from '@shared/ui';

interface DonationPaymentDetailsProps {
	data: {
		orderId: string;
		address: string;
		amount: number;
		currency: string;
	};
	status: string;
	onStatusChange: (status: string) => void;
	onClose: () => void;
}

interface CryptoOption {
	id: string;      // usdttrc20
	label: string;   // USDT
	network: string; // TRC-20
}

const SUPPORTED_CURRENCIES: Record<string, CryptoOption> = {
	usdttrc20: { id: 'usdttrc20', label: 'USDT', network: 'TRC-20' }
};

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
	const { orderId, address, amount, currency } = data;

	const currencyKey = currency ? currency.toLowerCase() : '';
	const currencyInfo = SUPPORTED_CURRENCIES[currencyKey];

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
						{amount}
					</h3>

					<span className={styles.amountDescription}>
						{`${currencyInfo?.label} · ${currencyInfo?.network}`}
					</span>
				</div>

				<Button
					variant='text'
					onClick={() => handleCopy(String(amount))}
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
						value={address}
						viewBox={`0 0 256 256`}
					/>
				</div>

				<div className={styles.address}>
					{address}
				</div>

				<Button
					variant='text'
					onClick={() => handleCopy(address)}
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