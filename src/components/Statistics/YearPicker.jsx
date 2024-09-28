import styles from '../../css/YearPicker.module.css';

// icons
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function YearPicker({ year, increase, decrease }) {
	return (
		<div className={styles.yearPicker}>
			<FaMinus onClick={decrease} />
			<h2>{year}</h2>
			<FaPlus onClick={increase} />
		</div>
	);
}

export default YearPicker