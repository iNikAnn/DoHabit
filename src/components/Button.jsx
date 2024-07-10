import styles from '../css/Button.module.css';

// icons
import { IoIosArrowForward } from "react-icons/io";

function Button(props) {
	const {
		type, icon, text, arrow, color, bgColor, disabled, onClick
	} = props;

	return (
		<button
			type={type || 'button'}
			style={{ color: color, backgroundColor: bgColor }}
			className={styles.button}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
			{text}

			{arrow && (
				<IoIosArrowForward className={styles.arrow} />
			)}
		</button>
	);
}

export default Button;