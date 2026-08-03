import styles from './SupportPage.module.css';
import { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { DonationListTop } from '@widgets/donation-list-top';
import { DonationListRecent } from '@widgets/donation-list-recent';
import { Button, SegmentedControl } from '@shared/ui';

/**
 * Support page with toggleable donation lists.
 */
function SupportPage() {
	const { t } = useTranslation();
	const [type, setType] = useState<'top' | 'recent'>('top');

	return (
		<div className={styles.pages}>
			<div className={styles.toolbar}>
				<SegmentedControl
					options={[
						{ value: 'top', label: t('support.topTab') },
						{ value: 'recent', label: t('support.recentTab') }]
					}
					value={type}
					onChange={setType}
				/>
			</div>

			{type === 'top' && <DonationListTop />}
			{type === 'recent' && <DonationListRecent />}

			<div className={clsx('stuck-to-the-bottom', styles.actions)}>
				<Button>
					Donate
				</Button>
			</div>
		</div>
	);
}

export { SupportPage };