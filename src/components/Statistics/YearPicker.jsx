import styles from '../../css/YearPicker.module.css';

// icons
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function YearPicker({ earliestYear, currYear, selectedYear, increase, decrease }) {
	return (
		<div className={styles.yearPicker}>
			<button
				className={styles.btn}
				disabled={earliestYear >= selectedYear}
			>
				<FaMinus onClick={decrease} />
			</button>

			<h2>{selectedYear}</h2>

			<button
				className={styles.btn}
				disabled={selectedYear === currYear}
			>
				<FaPlus onClick={increase} />
			</button>
		</div>
	);
}

export default YearPicker;