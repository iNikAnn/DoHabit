import styles from './DonationSuccess.module.css';
import { FaCheckDouble } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Button } from '@shared/ui';

interface DonationSuccessProps {
	onClose: () => void;
}

/**
 * Component displayed after a successful donation.
 */
function DonationSuccess({ onClose }: DonationSuccessProps) {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<div className={styles.iconWrapper}>
				<FaCheckDouble className={styles.icon} />
			</div>

			<div className={styles.title}>
				{t('support.success.title')}
			</div>

			<Button
				variant='secondary'
				onClick={onClose}
				className={styles.closeButton}
			>
				{t('common.continue')}
			</Button>
		</div>
	);
}

export default DonationSuccess;