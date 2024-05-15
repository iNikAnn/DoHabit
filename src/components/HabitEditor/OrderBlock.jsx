import styles from '../../css/OrderBlock.module.css';

function OrderBlock({ habitsCount, currOrder, setCurrOrder }) {
	const handleChangeOrder = (dir) => {
		setCurrOrder((order) => {
			if (dir === 'down' && order + 1 <= habitsCount) {
				return order + 1;
			};

			if (dir === 'up' && order - 1 >= 1) {
				return order - 1;
			};

			return order;
		});
	};

	return (
		<label style={{ pointerEvents: 'none' }}>
			<div className={styles.header}>
				<h3>Order</h3>
			</div>

			<div className={styles.content}>
				<input
					className={styles.input}
					type="number"
					name="order"
					id="order"
					value={currOrder}
					tabIndex={-1}
					readOnly
				/>

				<button
					className={styles.btn}
					type='button'
					onClick={() => handleChangeOrder('down')}
				>
					Move Down
				</button>

				<button
					className={styles.btn}
					type='button'
					onClick={() => handleChangeOrder('up')}
				>
					Move Up
				</button>
			</div>
		</label>
	);
}

export default OrderBlock;