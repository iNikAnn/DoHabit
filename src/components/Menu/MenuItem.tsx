import styles from '../../css/MenuItem.module.css';

// router
import { Link, useLocation } from 'react-router-dom';

// types
import React, { JSX } from 'react';

// icons
import { IoIosArrowForward } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";

interface Props {
	icon: JSX.Element;
	iconColor?: string;
	title: string;
	desc: string;
	onClick?: (...args: any) => void;
	to?: string;
	state?: { modalTitle: string };
	arrow?: boolean;
	link?: boolean;
	other?: React.ReactNode;
}

function MenuItem({ icon, iconColor, title, desc, onClick, to, state, arrow, link, other }: Props) {
	const location = useLocation();

	return (
		<li>
			<Link to={to ?? location.pathname} state={state}>
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