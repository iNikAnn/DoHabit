import styles from './WelcomeView.module.css';
import type { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FaPlane, FaShieldAlt, FaStar } from 'react-icons/fa';
import { Button } from '@shared/ui';

const BASE_URL = import.meta.env.BASE_URL;

function WelcomeView() {
	const { t } = useTranslation();

	const handleInstallPwa = () => {

	};

	const handleContinue = () => {

	};

	const benefits: {
		icon: ReactNode,
		text: string
	}[] = [
			{
				icon: <FaShieldAlt className={styles.highlight} />,
				text: t('welcome.benefits.privacy')
			},
			{
				icon: <FaPlane className={styles.highlight} />,
				text: t('welcome.benefits.offline')
			},
			{
				icon: <FaStar className={styles.highlight} />,
				text: t('welcome.benefits.simplicity')
			}
		];

	return (
		<section className={styles.page}>
			<div className={styles.contentWrapper}>

				{/* Left side */}
				<div className={styles.textColumn}>
					<div className={styles.logoWrapper}>
						<img
							src={`${BASE_URL}/assets/brand/logo192-alpha.png`}
							alt='logo'
							className={styles.logoImg}
						/>

						{/* disable-eslint-line */}
						<h2>DoHabit</h2>
					</div>

					<h1 className={styles.title}>
						<div>
							{t('welcome.titleLine1')}
						</div>

						<div>
							{t('welcome.titleLine2')}
						</div>
					</h1>

					<p className={styles.description}>
						{t('welcome.description')}
					</p>

					<ul className={styles.benefitsList}>
						{benefits.map((b) => (
							<li key={b.text} className={styles.benefitItem}>
								{b.icon}

								<Trans
									defaults={b.text}
									components={{ bold: <strong className={styles.highlight} /> }}
								/>
							</li>
						))}
					</ul>

					<div className={styles.actions}>
						<Button
							onClick={handleInstallPwa}
							className={styles.installButton}
						>
							{t('welcome.actions.install')}
						</Button>

						<Button
							variant='secondary'
							onClick={handleContinue}
							className={styles.skipButton}
						>
							{t('welcome.actions.continue')}
						</Button>
					</div>
				</div>

				{/* Right side */}
				<div className={styles.imageColumn}>
					<img
						src={`${BASE_URL}/assets/img/194_sdfsldjhfs.png`}
						alt='screenshot'
						className={styles.screenshot}
					/>
				</div>

			</div>
		</section>
	);
}

export { WelcomeView };