import styles from '../../css/TitleBlock.module.css';

function TitleBlock({ input, alreadyExist, onChange }) {
	return (
		<label className={styles.label}>
			<div className={styles.header}>
				<h3>Title</h3>
			</div>

			<input type="text" name="title" id="title"
				className={`${styles.input} ${alreadyExist ? styles.alreadyExist : ''}`}
				value={input}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Enter habit title"
			/>
		</label>
	);
}

export default TitleBlock;