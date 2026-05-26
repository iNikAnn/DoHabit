import { IoIosArrowForward } from 'react-icons/io';
import styles from './ModalHeader.module.css';

interface ModalHeaderProps {
	title: string;
	onClose: () => void;
}

function ModalHeader({ title, onClose }: ModalHeaderProps) {
	return (
		<header className={styles.header}>
			<IoIosArrowForward onClick={onClose} />

			<h1 className={styles.title}>
				{title}
			</h1>
		</header>
	);
}

export default ModalHeader;