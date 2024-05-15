import styles from '../../css/IconBlock.module.css';

function IconBlock({ iconList, state, onToggleState }) {
	return (
		<label className={styles.label}>
			<div className={styles.header}>
				<h3>Icon</h3>

				<button
					type='button'
					className={styles.showMoreBtn}
					onClick={onToggleState}
				>
					{'Show ' + (state ? 'more' : 'less')}
				</button>
			</div>

			<div className={styles.iconList}>
				{iconList}
			</div>
		</label>
	);
}

export default IconBlock;