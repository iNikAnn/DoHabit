import styles from '../../css/MenuItem.module.css';

// router
import { Link } from 'react-router-dom';

// icons
import { IoIosArrowForward } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";

function MenuItem({ icon, iconColor, title, desc, onClick, to, state, arrow, link, other }) {
	return (
		<li>
			<Link to={to} state={state}>
				<button
					className={styles.menuItem}
					onClick={onClick}
				>
					{icon && (
						<div style={{ color: iconColor }}>
							{icon}
						</div>
					)}

					<div className={styles.textWrapper}>
						<h3 className={styles.title}>
							{title}
						</h3>

						<small className={styles.desc}>
							{desc}
						</small>
					</div>

					{arrow && (
						<IoIosArrowForward />
					)}

					{link && (
						<LuExternalLink />
					)}

					{other && (
						<div className={styles.other}>
							{other}
						</div>
					)}
				</button>
			</Link>
		</li>
	);
}

export default MenuItem;