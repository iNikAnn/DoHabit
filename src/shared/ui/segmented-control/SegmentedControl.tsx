import styles from './SegmentedControl.module.css';
import clsx from 'clsx';
import { Button } from '@shared/ui';
import { motion } from 'framer-motion';

interface ControlOption {
	value: string;
	label?: string
}

interface SegmentedControlProps {
	options: ControlOption[];
	value: string;
	onChange: (v: string) => void;
}

function SegmentedControl(props: SegmentedControlProps) {
	const {
		options,
		value,
		onChange
	} = props;

	return (
		<div
			role='radiogroup'
			className={styles.container}
		>
			{options.map((o) => {
				const isSelected = o.value === value;

				return (
					<Button
						key={o.value}
						role='radio'
						aria-checked={isSelected}
						className={clsx(
							styles.tab,
							isSelected && styles.selected
						)}
						onClick={() => onChange(o.value)}
					>
						{isSelected && (
							<motion.div
								layoutId='selectedTabBackground'
								className={styles.selectedIndicator}
								transition={{ type: 'spring', stiffness: 350, damping: 30 }}
							/>
						)}

						<span className={styles.tabText}>
							{o.label ?? o.value}
						</span>
					</Button>
				);
			})}
		</div>
	);
}

export { SegmentedControl };