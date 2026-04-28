import styles from '../css/Placeholder.module.css';

// react
import { CSSProperties, JSX } from 'react';

// router
import { Link, useLocation } from 'react-router-dom';

// componets
import Button from './Button';

interface Props {
	style?: CSSProperties;
	image?: JSX.Element;
	title: string;
	desc: string;
	textOnButton?: string;
	buttonIcon?: JSX.Element;
	to?: string;
	state?: { modalTitle: string };
	accentColor?: string;
	onClick?: (...args: any) => void;
}

function Placeholder(props: Props) {
	const location = useLocation();

	const {
		style,
		image, title, desc,
		textOnButton, buttonIcon,
		to, state, onClick, accentColor
	} = props;

	return (
		<div style={style} className={styles.placeholder}>
			{image}

			<div className={styles.textWrapper}>
				<h3>{title}</h3>
				<span className={styles.desc}>
					{desc}
				</span>
			</div>

			{textOnButton && (
				<Link to={to ?? location.pathname} state={state}>
					<Button
						icon={buttonIcon}
						text={textOnButton}
						bgColor={accentColor}
						onClick={onClick}
					/>
				</Link>
			)}
		</div>
	);
}

export default Placeholder;