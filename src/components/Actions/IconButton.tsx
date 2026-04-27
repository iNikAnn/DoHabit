import { JSX } from 'react';
import styles from '../../css/IconButton.module.css';

interface Props {
	style?: Record<string, unknown>;
	icon: JSX.Element;
	text: string;
	disabled?: boolean;
	onClick?: (...args: any) => void;
}

function IconButton({ style = {}, icon, text, onClick, disabled = false }: Props) {
	return (
		<button
			style={style}
			className={styles.btn}
			aria-label={text}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
		</button>
	);
}

export default IconButton;