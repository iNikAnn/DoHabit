import styles from './DonationPaymentDetails.module.css';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import { copyToClipboard } from '@shared/lib/dom';
import { Button } from '@shared/ui';

interface DonationPaymentDetailsProps {
	data: {
		address: string;
		amount: number;
		currency: string;
	};
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
function DonationPaymentDetails({ data }: DonationPaymentDetailsProps) {
	const { t } = useTranslation();
	const { address, amount, currency } = data;

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
			<div className={styles.amountBlock}>
				<h3 className={styles.amount}>
					{amount}
				</h3>

				<span className={styles.amountDescription}>
					{`${currencyInfo?.label} · ${currencyInfo?.network}`}
				</span>
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

			<div className={styles.addressBlock}>
				<div className={styles.address}>
					{address}
				</div>

				<Button
					variant='text'
					onClick={() => handleCopy(address)}
				>
					{t('support.copyAddress')}
				</Button>
			</div>
		</div>
	);
}

export default DonationPaymentDetails;