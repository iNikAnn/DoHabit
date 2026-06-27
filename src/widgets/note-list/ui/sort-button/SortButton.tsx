import styles from './SortButton.module.css';
import clsx from 'clsx';
import { FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Button } from '@shared/ui';

interface SortButtonProps {
	order: 'asc' | 'desc';
	className?: string;
	onClick: () => void;
}

function SortButton({ order, className, onClick }: SortButtonProps) {
	return (
		<Button
			className={clsx(
				styles.sortButton,
				className,
				order === 'asc' && styles.active
			)}
			onClick={onClick}
		>
			<motion.div
				animate={{ rotate: order === 'asc' ? 180 : 0 }}
				transition={{ type: 'spring', stiffness: 300, damping: 25 }}
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<FaArrowDown />
			</motion.div>
		</Button>
	)
}

export default SortButton;