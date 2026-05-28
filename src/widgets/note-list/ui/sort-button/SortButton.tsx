import styles from './SortButton.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Button } from '@shared/ui';
import { FaArrowDown } from 'react-icons/fa';

interface SortButtonProps {
	order: 'asc' | 'desc';
	onClick: () => void;
}

function SortButton({ order, onClick }: SortButtonProps) {
	return (
		<Button
			className={clsx(
				styles.sortButton,
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