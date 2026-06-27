import { FaHashtag } from 'react-icons/fa';
import { Button } from '@shared/ui';

interface TagButtonProps {
	isActive: boolean;
	className?: string;
	onClick: () => void;
}

function TagButton({ isActive, className, onClick }: TagButtonProps) {
	return (
		<Button
			variant='secondary'
			style={{
				backgroundColor: isActive ? 'var(--bg-color-secondary)' : 'var(--bg-color-primary)',
				color: isActive ? 'var(--accent-color)' : ''
			}}
			className={className}
			onClick={onClick}
		>
			<FaHashtag />
		</Button>
	);
}

export default TagButton