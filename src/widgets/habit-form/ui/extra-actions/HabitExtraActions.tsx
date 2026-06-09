import styles from './HabitExtraActions.module.css';
import { useTranslation } from 'react-i18next';
import { FaEllipsisH } from 'react-icons/fa';
import useHabitExtraActions from '@widgets/habit-form/model/useHabitExtraActions';
import { Button, useDrawerStore } from '@shared/ui';

interface HabitExtraActionsProps {
	habitId: string;
	onSuccess: () => void;
}

function HabitExtraActions({ habitId, onSuccess }: HabitExtraActionsProps) {
	const { t } = useTranslation();
	const openDrawer = useDrawerStore((s) => s.open);
	const actions = useHabitExtraActions(habitId, onSuccess);

	return (
		<Button
			className={styles.button}
			onClick={() => openDrawer({
				title: t('habits.dialogs.manageTitle'),
				actions
			})}
		>
			<FaEllipsisH />
		</Button>
	);
}

export default HabitExtraActions;