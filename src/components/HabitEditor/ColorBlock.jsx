import styles from '../../css/ColorBlock.module.css';

function ColorBlock({ colorList }) {
	return (
		<label className={styles.label}>
			<div className={styles.header}>
				<h3>Color</h3>
			</div>

			<div className={styles.colorList}>
				{colorList}
			</div>
		</label>
	);
}

export default ColorBlock;