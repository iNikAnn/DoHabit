import styles from '../../css/Menu.module.css';
import packageJson from '../../../package.json';

// components
import MenuItem from './MenuItem';

// icons
import { BsFillDatabaseFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

function Menu({ onOpenModal }) {
	return (
		<section className={styles.menu}>
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

			<div className={styles.footer}>
				<small>Version: {packageJson.version}</small>
			</div>
		</section>
	);
}

export default Menu;