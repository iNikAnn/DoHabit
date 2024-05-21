import styles from '../../css/FrequencyBlock.module.css';

// react
import { useState } from 'react';

function FrequencyBlock({ currentFrequency }) {
	const [frequency, setFrequency] = useState(currentFrequency || 1);
	const maxFrequency = 6;

	const handleClick = (dir) => {
		setFrequency((curr) => {
			if (dir === 'decrease') {
				return Math.max(1, curr - 1);
			};

			if (dir === 'increase') {
				return Math.min(maxFrequency, curr + 1);
			};

			return curr;
		});
	};

	return (
		<section>
			<div className={styles.header}>
				<h3>Frequency</h3>
			</div>

			<div className={styles.content}>
				<div className={styles.left}>
					<input type="number" name="frequency" id="frequency"
						className={`${styles.input}`}
						value={frequency}
						tabIndex={-1}
						readOnly
					/>

					<div>/ Day</div>
				</div>

				<button
					type="button"
					className={styles.btn}
					onClick={() => handleClick('decrease')}
					disabled={frequency <= 1}
				>
					Decrease
				</button>

				<button
					type="button"
					className={styles.btn}
					onClick={() => handleClick('increase')}
					disabled={frequency >= maxFrequency}
				>
					Increase
				</button>
			</div>
		</section>
	);
}

export default FrequencyBlock;