import { Button } from '@shared/ui';
import { FaHashtag } from 'react-icons/fa';

interface TagButtonProps {
	isActive: boolean;
	onClick: () => void;
}

function TagButton({ isActive, onClick }: TagButtonProps) {
	return (
		<Button
			variant='secondary'
			style={{
				height: '100%',
				aspectRatio: 1,
				backgroundColor: isActive ? 'var(--bg-color-secondary)' : 'var(--bg-color-primary)',
				color: isActive ? 'var(--accent-color)' : ''
			}}
			onClick={onClick}
		>
			<FaHashtag />
		</Button>
	);
}

export default TagButton