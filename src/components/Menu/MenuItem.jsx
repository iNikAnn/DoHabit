import styles from '../../css/MenuItem.module.css';

// icons
import { IoIosArrowForward } from "react-icons/io";

function MenuItem({ icon, title, desc, onClick }) {
	return (
		<li>
			<button
				className={styles.menuItem}
				onClick={onClick}
			>
				{icon}

				<div className={styles.textWrapper}>
					<h3 className={styles.title}>
						{title}
					</h3>

					<small className={styles.desc}>
						{desc}
					</small>
				</div>

				<IoIosArrowForward />
			</button>
		</li>
	)
}

export default MenuItem;