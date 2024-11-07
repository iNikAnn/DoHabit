import styles from '../css/MainPage.module.css';

// framer
import { motion } from 'framer-motion';

// components
import Header from './Header';
import HabitList from './HabitList';
import Placeholder from './Placeholder';

// icons
import { ReactComponent as Calendar } from '../img/calendar.svg';
import { MdAddToPhotos } from "react-icons/md";

const mainVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: .3, ease: 'easeOut' }
};

function MainPage({ habits, dbIcons, dbColors, onUpdate, onOpenModal }) {

	const filteredHabits = habits.filter((h) => !h.isArchived);

	return (
		<motion.div {...mainVariants}>
			<Header {...{ onOpenModal }} />

			<HabitList
				{...{ habits: filteredHabits, dbIcons, dbColors }}

				{...{ onOpenModal, onUpdate }}
			/>

			{filteredHabits.length === 0 && (
				<Placeholder
					image={<Calendar />}
					title="No active habits found"
					desc="Why not create one now?"
					textOnButton="Create First Habit"
					buttonIcon={<MdAddToPhotos />}
					to={`${process.env.PUBLIC_URL}/modal/habitEditor`}
					onClick={() => onOpenModal({
						type: 'open',
						modalTitle: 'Create new habit'
					})}
				/>
			)}
		</motion.div>
	);
}

export default MainPage;