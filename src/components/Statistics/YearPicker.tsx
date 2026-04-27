import styles from '../../css/YearPicker.module.css';

// icons
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

interface Props {
	earliestYear: number;
	currYear: number;
	selectedYear: number;
	onIncrease: () => void;
	onDecrease: () => void;
}

function YearPicker({ earliestYear, currYear, selectedYear, onIncrease, onDecrease }: Props) {
	return (
		<div className={styles.yearPicker}>
			<button
				className={styles.btn}
				disabled={earliestYear >= selectedYear}
			>
				<FaMinus onClick={onDecrease} />
			</button>

			<h2>{selectedYear}</h2>

			<button
				className={styles.btn}
				disabled={selectedYear === currYear}
			>
				<FaPlus onClick={onIncrease} />
			</button>
		</div>
	);
}

export default YearPicker;