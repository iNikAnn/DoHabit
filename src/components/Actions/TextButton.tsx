import styles from '../../css/TextButton.module.css';

// utils
import { startCase } from 'es-toolkit';

interface Props {
	text: string;
	onClick: (...args: any) => void;
}

function TextButton({ text = 'Click me', onClick }: Props) {
	return (
		<button
			className={styles.btn}
			onClick={onClick}
		>
			{startCase(text)}
		</button>
	);
}

export default TextButton