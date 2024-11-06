import styles from '../../css/TextButton.module.css';

// utils
import getCapitalizedText from '../../utils/getCapitalizedText';

function TextButton({ text = 'Click me', onClick }) {

	const capitalizedText = getCapitalizedText(text);

	return (
		<button
			className={styles.btn}
			onClick={onClick}
		>
			{capitalizedText}
		</button>
	);
}

export default TextButton