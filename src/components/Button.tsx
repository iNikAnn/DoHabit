import styles from '../css/Button.module.css';

// react
import { JSX } from 'react';

// icons
import { IoIosArrowForward } from "react-icons/io";

interface Props {
	type: 'submit' | 'button';
	icon: JSX.Element;
	text: string;
	arrow: boolean;
	color: string;
	bgColor: string;
	disabled: boolean;
	onClick: (...args: any) => void;
}

function Button(props: Props) {
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