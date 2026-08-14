import styles from './DonationForm.module.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { toast } from 'sonner';
import { FaCheckDouble, FaSpinner } from 'react-icons/fa';
import DonationPaymentDetails from '../donation-payment-details/DonationPaymentDetails';
import { checkDonationStatus } from '../../api/checkDonationStatus';
import { createDonation } from '../../api/createDonation';
import { DEFAULT_CURRENCY_ID, MIN_DONATION_FOR_MESSAGE, PRESET_AMOUNTS, SUPPORTED_CURRENCIES, TOKEN_ICONS } from '../../model/constants';
import { getStoredDonation } from '../../model/getStoredDonation';
import type { CryptoId, PaymentData, PaymentStatus } from '../../model/types';
import { useUserStore } from '@entities/user';
import { renderIcon } from '@shared/lib/react';
import { Button, Placeholder, SectionHeader, useDialogStore } from '@shared/ui';

/**
 * Donation form component with preset/custom amounts and dynamic message input.
 */
function DonationForm() {
	// UI localization
	const { t } = useTranslation();

	// Stores
	const closeDialog = useDialogStore((s) => s.close);
	const { clientId, username } = useUserStore((s) => s.user);

	// Form state
	const [paymentData, setPaymentData] = useState<PaymentData | null>(() => getStoredDonation());
	const [isLoading, setIsLoading] = useState(!!paymentData);
	const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('waiting');

	const [selectedCrypto, setSelectedCrypto] = useState<CryptoId>(DEFAULT_CURRENCY_ID);
	const [selectedPreset, setSelectedPreset] = useState<number>(PRESET_AMOUNTS[0]);
	const [customAmount, setCustomAmount] = useState<number>(0);
	const [message, setMessage] = useState<string>('');

	// Check active pending donation on mount
	useEffect(() => {
		if (!paymentData) return;

		checkDonationStatus(paymentData.orderId)
			.then((status) => {
				if (status === 'confirmed' || status === 'finished') {
					setPaymentStatus('finished');
				} else if (['waiting', 'confirming', 'partially_paid'].includes(status)) {
					setPaymentStatus(status);
				} else {
					setPaymentData(null);
				}
			})
			.catch((error) => {
				console.error('Failed to sync payment status:', error);
				setPaymentData(null);
				localStorage.removeItem('pendingDonation');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [paymentData]);

	// Derived values
	const finalAmount = selectedPreset || (customAmount ?? 0);
	const isMessageAllowed = finalAmount >= MIN_DONATION_FOR_MESSAGE;
	const finalMessage = isMessageAllowed ? message : undefined;
	const isSubmitDisabled = isLoading || finalAmount < PRESET_AMOUNTS[0];

	// Handlers
	const handlePresetSelect = (amount: number) => {
		setCustomAmount(0);
		setSelectedPreset(amount);
	};

	const handleCustomAmountChange = (amount: number) => {
		setSelectedPreset(0);
		setCustomAmount(amount);
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			const data = await createDonation({
				clientId,
				username,
				currency: selectedCrypto,
				amount: finalAmount,
				message: finalMessage,
				isAnonymous: false
			});

			setPaymentData(data);
		} catch (error) {
			console.error('Donation error:', error);
			toast.error(t('support.notifications.donationError'));
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<Placeholder
				content={{
					image: <FaSpinner className={clsx(styles.placeholderImage, styles.spinner)} />,
					title: t('common.loading')
				}}
				variant='inline'
			/>
		);
	}

	if (paymentStatus === 'finished') {
		return (
			<Placeholder
				content={{
					image: <FaCheckDouble className={styles.placeholderImage} color='rgb(34 197 94)' />,
					title: t('support.success.title')
				}}
				action={[{
					label: t('common.continue'),
					variant: 'secondary',
					onClick: () => {
						setPaymentData(null);
						closeDialog();
					}
				}]}
				variant='inline'
			/>
		);
	}

	if (paymentData) {
		return (
			<DonationPaymentDetails
				data={paymentData}
				status={paymentStatus}
				onStatusChange={setPaymentStatus}
				onClose={closeDialog}
			/>
		);
	}

	return (
		<form autoComplete='off' className={styles.form}>
			<fieldset className={styles.fieldset} disabled={isLoading}>
				{/* Crypto Section */}
				<section className={styles.section}>
					<SectionHeader
						title={t('support.form.crypto.title')}
						description={t('support.form.crypto.description')}
						className={styles.sectionHeader}
					/>

					<div className={styles.cryptoRadioGroup}>
						{Object.values(SUPPORTED_CURRENCIES).map((c) => (
							<label key={c.id} className={clsx(styles.radioLabel, styles.cryptoLabel)}>
								<input
									type='radio'
									name='crypto'
									id={`crypto-${c.id}`}
									value={c.id}
									checked={c.id === selectedCrypto}
									onChange={() => setSelectedCrypto(c.id)}
									hidden
								/>

								<div className={styles.cryptoOption}>
									{renderIcon(TOKEN_ICONS[c.tokenKey], { size: 28 })}
									<span>{c.tokenLabel}</span>
									<span style={{ color: 'var(--color-secondary)' }}>{`(${c.networkLabel})`}</span>
								</div>
							</label>
						))}
					</div>
				</section>

				{/* Amount Section */}
				<section className={styles.section}>
					<SectionHeader
						title={t('support.form.amount.title')}
						description={t('support.form.amount.description', { min: PRESET_AMOUNTS[0] })}
						className={styles.sectionHeader}
					/>

					<div className={styles.amountRadioGroup}>
						{PRESET_AMOUNTS.map((a) => (
							<label key={`amount-${a}`} className={clsx(styles.radioLabel, styles.amountLabel)}>
								<input
									type='radio'
									name='amount'
									id={`amount-${a}`}
									value={a}
									checked={a === selectedPreset}
									onChange={() => handlePresetSelect(a)}
									hidden
								/>

								<div>${a}</div>
							</label>
						))}

						{/* Custom Amount */}
						<input
							type='search'
							inputMode='numeric'
							enterKeyHint='next'
							name='custom-amount'
							id='custom-amount'
							min={PRESET_AMOUNTS[0]}
							pattern='[0-9]*'
							value={customAmount || ''}
							onChange={(e) => handleCustomAmountChange(Number(e.target.value))}
							placeholder={t('support.form.amount.placeholder')}
							className={clsx(styles.input, styles.customAmountInput)}
						/>
					</div>
				</section>

				{/* Message Section */}
				<section className={styles.section}>
					<SectionHeader
						title={t('support.form.message.title')}
						description={t('support.form.message.description', { min: MIN_DONATION_FOR_MESSAGE })}
						className={styles.sectionHeader}
					/>

					<input
						type='search' // Using 'search' type to kill mobile autofill
						enterKeyHint='enter'
						autoComplete='off'
						name='message'
						id='message'
						maxLength={140}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder={t('support.form.message.placeholder')}
						className={styles.input}
						disabled={!isMessageAllowed}
					/>
				</section>
			</fieldset>

			{!username && (
				<div className={styles.anonymousNotice}>
					{t('support.anonymousPaymentWarning')}
				</div>
			)}

			{/* Form Actions */}
			<div className={styles.actions}>
				<Button
					variant='secondary'
					className={styles.closeButton}
					onClick={closeDialog}
				>
					{t('common.close')}
				</Button>

				<Button
					className={styles.submitButton}
					disabled={isSubmitDisabled}
					onClick={handleSubmit}
				>
					{t('support.actions.submitPayment')}
				</Button>
			</div>
		</form>
	);
}

export { DonationForm };