import { Link } from 'react-router-dom';
import styles from '../css/Placeholder.module.css';

// componets
import Button from './Button';

function Placeholder(props) {
	const {
		image, title, desc,
		textOnButton, buttonIcon,
		to, onClick, accentColor
	} = props;

	return (
		<div className={styles.placeholder}>
			{image}

			<div className={styles.textWrapper}>
				<h3>{title}</h3>
				<span className={styles.desc}>
					{desc}
				</span>
			</div>

			{textOnButton && (
				<Link to={to}>
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