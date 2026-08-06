import styles from './SupportPage.module.css';
import { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { DonationListTop } from '@widgets/donation-list-top';
import { DonationListRecent } from '@widgets/donation-list-recent';
import { DonationForm } from '@features/donate';
import { Button, SegmentedControl, useDialogStore } from '@shared/ui';

/**
 * Support page with toggleable donation lists.
 */
function SupportPage() {
	const { t } = useTranslation();
	const openDialog = useDialogStore((s) => s.open);
	const [activeTab, setActiveTab] = useState<'top' | 'recent'>('top');

	const handleOpenDonateModal = () => {
		openDialog({
			title: t('support.form.title'),
			children: <DonationForm />
		});
	};

	return (
		<div className={styles.pages}>
			<div className={styles.toolbar}>
				<SegmentedControl
					options={[
						{ value: 'top', label: t('support.topTab') },
						{ value: 'recent', label: t('support.recentTab') }]
					}
					value={activeTab}
					onChange={setActiveTab}
				/>
			</div>

			{activeTab === 'top' && <DonationListTop />}
			{activeTab === 'recent' && <DonationListRecent />}

			<div className={clsx('stuck-to-the-bottom', styles.actions)}>
				<Button onClick={handleOpenDonateModal}>
					{t('support.actions.donate')}
				</Button>
			</div>
		</div>
	);
}

export { SupportPage };