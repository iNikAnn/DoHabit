import styles from '../../css/HabitMenu.module.css';

function HabitMenu(props) {
	const {
		title,

		// 'on' functions
		onOpenModal
	} = props;

	const modalProps = {
		habitTitle: title
	};

	return (
		<div className={styles.menu}>
			<ul className={styles.list}>
				<li>
					<button onClick={() => onOpenModal({
						...modalProps,
						modalTitle: 'Edit habit',
						modalContent: 'habitEditor'
					})}>Edit</button>
				</li>

				<li>
					<button onClick={() => onOpenModal({
						...modalProps,
						modalTitle: title,
						modalContent: 'habitProfile'
					})}>Diary</button>
				</li>
			</ul>
		</div>
	)
}

export default HabitMenu;