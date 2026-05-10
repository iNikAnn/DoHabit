import { MdAddToPhotos } from 'react-icons/md';
import { CalendarIcon, TableIcon } from '@shared/assets';
import { getModalPath } from '@shared/const';
import { Placeholder } from '@shared/ui';

interface Props {
	isArchive: boolean;
}

function HabitListEmpty({ isArchive }: Props) {
	return isArchive ? (
		<Placeholder
			content={{
				image: <TableIcon />,
				title: 'No archived habits found',
				description: 'You can archive a habit by editing it.'
			}}
		/>
	) : (
		<Placeholder
			content={{
				image: <CalendarIcon />,
				title: 'No active habits found',
				description: 'Why not create one now?'
			}}
			action={{
				label: 'Create First Habit',
				icon: <MdAddToPhotos />,
				to: getModalPath('HABIT_EDITOR'),
				state: { modalTitle: 'Create new habit' }
			}}
		/>
	);
}

export default HabitListEmpty;