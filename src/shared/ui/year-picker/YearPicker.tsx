import styles from './YearPicker.module.css';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Button } from '@shared/ui';

interface YearPickerProps {
	value: number;
	min: number;
	max: number;
	onChange: (v: number) => void;
}

/**
 * A controlled picker component for cycling through a range of years
 * using increment and decrement buttons.
 */
function YearPicker(props: YearPickerProps) {
	const {
		value,
		min,
		max,
		onChange
	} = props;

	const handleDecrease = () => {
		onChange(Math.max(min, value - 1));
	};

	const handleIncrease = () => {
		onChange(Math.min(max, value + 1))
	};

	return (
		<div className={styles.yearPicker}>
			<Button
				className={styles.button}
				variant='secondary'
				disabled={value <= min}
			>
				<FaMinus onClick={handleDecrease} />
			</Button>

			<h2>{value}</h2>

			<Button
				className={styles.button}
				variant='secondary'
				disabled={value >= max}
			>
				<FaPlus onClick={handleIncrease} />
			</Button>
		</div>
	);
}

export { YearPicker };