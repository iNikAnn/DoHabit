import styles from '../../css/Menu.module.css';
import packageJson from '../../../package.json';

// components
import MenuItem from './MenuItem';

// icons
import { BsFillDatabaseFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

function Menu({ onOpenModal }) {
	return (
		<section className={styles.menu}>
			<ul className={styles.list}>
				<MenuItem
					icon={<BsFillDatabaseFill />}
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
					title="GitHub Repository"
					desc="View or contribute to the project"
					onClick={() => window.open('https://github.com/iNikAnn/DoHabit', '_blank')}
					link
				/>
			</ul>

			<div className={styles.footer}>
				<small>Version: {packageJson.version}</small>
			</div>
		</section>
	)
}

export default Menu;