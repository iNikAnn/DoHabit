import styles from './SegmentedControl.module.css';
import clsx from 'clsx';
import { Button } from '@shared/ui';

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
						{o.label ?? o.value}
					</Button>
				);
			})}
		</div>
	);
}

export { SegmentedControl };