import styles from './SegmentedControl.module.css';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@shared/ui';

interface ControlOption<T extends string> {
	value: T;
	label?: string
}

interface SegmentedControlProps<T extends string> {
	options: ControlOption<T>[];
	value: T;
	className?: string,
	onChange: (v: T) => void;
}

function SegmentedControl<T extends string>(props: SegmentedControlProps<T>) {
	const {
		options,
		value,
		className,
		onChange
	} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const [showLeft, setShowLeft] = useState(false);
	const [showRight, setShowRight] = useState(false);

	const checkScroll = () => {
		const el = containerRef.current;
		if (!el) return;

		const { scrollLeft, scrollWidth, clientWidth } = el;

		setShowLeft(scrollLeft > 1);
		setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
	};

	useEffect(() => {
		checkScroll();
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={clsx(styles.gradient, styles.left, showLeft && styles.visible)} />
			<div className={clsx(styles.gradient, styles.right, showRight && styles.visible)} />

			<div
				ref={containerRef}
				role='radiogroup'
				className={styles.container}
				onScroll={checkScroll}
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
		</div>
	);
}

export { SegmentedControl };