import styles from '../css/Placeholder.module.css';

// router
import { Link } from 'react-router-dom';

// componets
import Button from './Button';

function Placeholder(props) {
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
				<Link to={to} state={state}>
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