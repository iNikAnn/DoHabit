import styles from './DonationPaymentDetails.module.css';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import CheckStatusButton from '../check-status-button/CheckStatusButton';
import { NETWORK_ICONS, SUPPORTED_CURRENCIES, TOKEN_ICONS } from '../../model/constants';
import type { PaymentData, PaymentStatus } from '../../model/types';
import { copyToClipboard } from '@shared/lib/dom';
import { renderIcon } from '@shared/lib/react';
import { Button } from '@shared/ui';
import { FaCopy } from 'react-icons/fa6';

interface DonationPaymentDetailsProps {
	data: PaymentData;
	status: PaymentStatus;
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
				<div className={styles.amountRow}>
					<h3 className={styles.amount}>
						{payAmount}
					</h3>

					<Button
						variant='secondary'
						icon={<FaCopy />}
						className={styles.copyAmountButton}
						onClick={() => handleCopy(String(payAmount))}
					>
						{t('support.actions.copyAmount')}
					</Button>
				</div>

				<div className={styles.metaRow}>
					<div className={styles.tokenWrapper}>
						{renderIcon(TOKEN_ICONS[currencyInfo?.tokenKey], { size: 28 })}
						<span>{currencyInfo?.tokenLabel}</span>
					</div>

					<div style={{ fontWeight: 900 }}>
						{`·`}
					</div>

					<div className={styles.networkWrapper}>
						{renderIcon(NETWORK_ICONS[currencyInfo?.networkKey], { size: 28 })}
						<span>{currencyInfo?.networkLabel}</span>
					</div>
				</div>
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