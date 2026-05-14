import styles from './MenuPage.module.css';
import packageJson from '../../../../package.json';
import { BsFillDatabaseFill } from 'react-icons/bs';
import { FaGithub, FaPaintBrush } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { ImFire } from 'react-icons/im';
import { HiArchiveBox } from 'react-icons/hi2';
import { getModalPath } from '@shared/const';
import { clearLocalStorage } from '@shared/lib';
import { MenuItemProps, MenuList } from '@shared/ui';

// @ts-ignore
const PUBLIC_URL = process.env.PUBLIC_URL ?? '/';

const warningMessage =
	'Are you sure you want to delete all application data?\n\n' +
	'This includes:\n' +
	'- All your habits\n' +
	'- All achievements\n' +
	'- All diary entries\n\n' +
	'This action cannot be undone!';

/**
 * Navigation hub for app settings.
 */
function MenuPage() {
	const appItems: MenuItemProps[] = [
		{
			icon: <HiArchiveBox color='#7b68ee' />,
			title: 'Archive',
			description: 'View or manage archived habits',
			to: getModalPath('ARCHIVE'),
			state: { modalTitle: 'Archive' },
			indicator: { type: 'arrow' }
		},
		{
			icon: <FaPaintBrush color='#ffa420' />,
			title: 'Appearance',
			description: 'Customize the app\'s look',
			to: getModalPath('APPEARANCE'),
			state: { modalTitle: 'Appearance' },
			indicator: { type: 'arrow' }
		},
		{
			icon: <BsFillDatabaseFill color='#77dd77' />,
			title: 'Export / Import Data',
			description: 'Backup or restore your data',
			to: getModalPath('DATA_MANAGEMENT'),
			state: { modalTitle: 'Export/Import Data' },
			indicator: { type: 'arrow' }
		}
	];

	const otherItems: MenuItemProps[] = [
		{
			icon: <FaGithub color='#7fc7ff' />,
			title: 'GitHub Repository',
			description: 'View or contribute to the project',
			onClick: () => window.open('https://github.com/iNikAnn/DoHabit', '_blank'),
			indicator: { type: 'external' }
		},
		{
			icon: <IoIosMail color='#ffb841' />,
			title: 'Send Feedback',
			description: 'Share feedback or report bugs',
			onClick: () => window.location.href = 'mailto:ilowen@ya.ru?subject=Feedback%20on%20DoHabit',
			indicator: { type: 'external' }
		}
	];

	const dangerItems: MenuItemProps[] = [
		{
			icon: <ImFire style={{ color: 'IndianRed' }} />,
			title: 'Clear Data',
			description: 'Delete all application data',
			onClick: () => {
				if (window.confirm(warningMessage)) {
					const userInput = prompt('To confirm, type: "delete data":');

					if (userInput?.trim().toLowerCase() === 'delete data') {
						clearLocalStorage();
						alert('All data has been successfully removed. The application will now reload.');
						window.location.href = PUBLIC_URL;
					} else {
						alert('Action canceled or incorrect phrase.');
					}
				}
			}
		}
	];

	return (
		<section className={styles.menu}>
			<MenuList
				title='App'
				items={appItems}
			/>

			<MenuList
				title='Other'
				items={otherItems}
			/>

			<MenuList
				title='Danger Zone'
				titleStyle={{ color: 'IndianRed' }}
				listStyle={{ border: '2px solid IndianRed' }}
				items={dangerItems}
			/>

			<div className={styles.footer}>
				<small>Version: {packageJson.version}</small>
			</div>
		</section>
	);
}

export { MenuPage };