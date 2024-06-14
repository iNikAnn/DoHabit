import styles from '../../css/OrderBlock.module.css';

function OrderBlock({ habitsCount, currOrder, setCurrOrder }) {
	const handleChangeOrder = (dir) => {
		setCurrOrder((order) => {
			if (dir === 'bottom') {
				return habitsCount;
			}
			else if (dir === 'top') {
				return 1;
			}
			else if (dir === 'down' && order + 1 <= habitsCount) {
				return order + 1;
			}
			else if (dir === 'up' && order - 1 >= 1) {
				return order - 1;
			};

			return order;
		});
	};

	return (
		<section style={{ pointerEvents: 'none' }}>
			<div className={styles.header}>
				<h3>Order</h3>
			</div>

			<div className={styles.content}>
				<div className={styles.top}>
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
						type="button"
						onClick={() => handleChangeOrder('down')}
						disabled={currOrder === habitsCount}
					>
						Step Down
					</button>

					<button
						className={styles.btn}
						type="button"
						onClick={() => handleChangeOrder('up')}
						disabled={currOrder === 1}
					>
						Step Up
					</button>
				</div>

				<div className={styles.bottom}>
					<button
						className='text-button'
						type="button"
						onClick={() => handleChangeOrder('bottom')}
						disabled={currOrder === habitsCount}
					>
						{currOrder === habitsCount ? 'Already at' : 'Move to'} Bottom
					</button>

					<button
						className='text-button'
						type="button"
						onClick={() => handleChangeOrder('top')}
						disabled={currOrder === 1}
					>
						{currOrder === 1 ? 'Already at' : 'Move to'} Top
					</button>
				</div>
			</div>
		</section>
	);
}

export default OrderBlock;