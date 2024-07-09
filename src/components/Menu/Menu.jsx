import styles from '../../css/Menu.module.css';
import packageJson from '../../../package.json';

// components
import MenuItem from './MenuItem';

// icons
import { BsFillDatabaseFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { ImFire } from "react-icons/im";

function Menu({ onOpenModal }) {
	return (
		<section className={styles.menu}>
			<div className={styles.category}>
				<h4>General</h4>

				<ul className={styles.list}>
					<MenuItem
						icon={<BsFillDatabaseFill />}
						iconColor="#77dd77"
						title="Export/Import Data"
						desc="Backup or restore your habits"
						onClick={() => onOpenModal({
							modalTitle: 'Export/Import Data',
							modalContent: 'dataTransfer'
						})}
						arrow
					/>

					<MenuItem
						icon={<FaGithub />}
						iconColor="#7fc7ff"
						title="GitHub Repository"
						desc="View or contribute to the project"
						onClick={() => window.open('https://github.com/iNikAnn/DoHabit', '_blank')}
						link
					/>

					<MenuItem
						icon={<IoIosMail />}
						iconColor="#ffb841"
						title="Send Feedback"
						desc="Share your thoughts or report an issue"
						onClick={() => window.location.href = 'mailto:ilowen@ya.ru?subject=Feedback%20on%20DoHabit'}
						link
					/>
				</ul>
			</div>

			<div className={styles.category}>
				<h4 style={{ color: 'IndianRed' }}>Danger Zone</h4>

				<ul className={styles.list}>
					<MenuItem
						icon={<ImFire style={{ color: 'IndianRed' }} />}
						title="Clear Data"
						desc="Delete all application data"
						onClick={() => {
							if (window.confirm('Are you sure you want to delete all application data?')) {
								const input = window.prompt('Enter the phrase "Delete all data".');

								if (input && input.toLowerCase() === 'delete all data') {
									localStorage.clear();
									alert('All data has been successfully removed. The application will now reload.');
									window.location.reload();
								} else {
									alert('You entered the wrong phrase, operation canceled.');
								};
							};
						}}
					/>
				</ul>
			</div>

			<div className={`${styles.category} ${styles.footer}`}>
				<small>Version: {packageJson.version}</small>
			</div>
		</section>
	);
}

export default Menu;