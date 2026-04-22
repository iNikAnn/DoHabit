import styles from '../../css/TextButton.module.css';

// utils
import { startCase } from 'es-toolkit';

function TextButton({ text = 'Click me', onClick }) {
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