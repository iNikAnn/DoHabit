import styles from '../../css/Diary.module.css';

function Diary({ diary }) {
	const notes = !diary || diary.length === 0
		? <span>Your diary is empty</span>
		: (
			<ul>
				{diary.map(
					(note) => (
						<li>{note}</li>
					)
				)}
			</ul>
		);

	return (
		<div>
			<div>
				<span>Diary</span>

				<button>Add new</button>
			</div>

			{notes}
		</div>
	)
}

export default Diary;