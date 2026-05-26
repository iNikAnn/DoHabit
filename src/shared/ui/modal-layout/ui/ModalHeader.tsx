import styles from './ModalHeader.module.css';
import { IoIosArrowForward } from 'react-icons/io';
import { Button } from '@shared/ui';

interface ModalHeaderProps {
	title: string;
	onClose: () => void;
}

function ModalHeader({ title, onClose }: ModalHeaderProps) {
	return (
		<header className={styles.header}>
			<Button
				className={styles.closeButton}
				onClick={onClose}
			>
				<IoIosArrowForward />
			</Button>

			<h1 className={styles.title}>
				{title}
			</h1>
		</header>
	);
}

export default ModalHeader;