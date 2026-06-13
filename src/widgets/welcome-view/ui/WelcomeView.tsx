import styles from './WelcomeView.module.css';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLock, FaPlane, FaShieldAlt } from 'react-icons/fa';
import { FaBoltLightning } from 'react-icons/fa6';
import { Button } from '@shared/ui';

const BASE_URL = import.meta.env.BASE_URL;

function WelcomeView() {
	const { t } = useTranslation();

	const handleInstallPwa = () => {

	};

	const handleContinue = () => {

	};

	const benefits: {
		icon: ReactNode;
		title: string;
		description: string;
	}[] = [
			{
				icon: <FaShieldAlt color='#10B981' />,
				title: t('welcome.benefits.privacy.title'),
				description: t('welcome.benefits.privacy.desc')
			},
			{
				icon: <FaLock color='#3B82F6' />,
				title: t('welcome.benefits.secure.title'),
				description: t('welcome.benefits.secure.desc')
			},
			{
				icon: <FaPlane color='#F59E0B' />,
				title: t('welcome.benefits.offline.title'),
				description: t('welcome.benefits.offline.desc')
			},
			{
				icon: <FaBoltLightning color='#8B5CF6' />,
				title: t('welcome.benefits.simplicity.title'),
				description: t('welcome.benefits.simplicity.desc')
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
							alt={t('common.logo')}
							className={styles.logoImg}
						/>

						{/* eslint-disable-next-line */}
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
							<li key={b.title} className={styles.benefitItem}>
								{b.icon}

								<div>
									<strong className={styles.benefitTitle}>
										{b.title}
									</strong>

									<small className={styles.benefitDescription}>
										{b.description}
									</small>
								</div>
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
						src={`${BASE_URL}/assets/img/welcome-hero-screenshot.png`}
						alt={t('common.screenshot')}
						className={styles.screenshot}
					/>
				</div>

			</div>
		</section>
	);
}

export { WelcomeView };