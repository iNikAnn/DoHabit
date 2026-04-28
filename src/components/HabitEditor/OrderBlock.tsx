import styles from '../../css/OrderBlock.module.css';

interface Props {
	habitsCount: number;
	currOrder: number;
	setCurrOrder: React.Dispatch<React.SetStateAction<number>>;
}

function OrderBlock({ habitsCount, currOrder, setCurrOrder }: Props) {
	const handleChangeOrder = (dir: 'top' | 'bottom' | 'up' | 'down') => {
		setCurrOrder((order) => {
			switch (dir) {
				case 'bottom':
					return habitsCount;

				case 'top':
					return 1;

				case 'down':
					return order + 1 <= habitsCount ? order + 1 : order;

				case 'up':
					return order - 1 >= 1 ? order - 1 : order;

				default:
					return order;
			}
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
						type='number'
						name='order'
						id='order'
						value={currOrder}
						tabIndex={-1}
						readOnly
					/>

					<button
						className={styles.btn}
						type='button'
						onClick={() => handleChangeOrder('down')}
						disabled={currOrder === habitsCount}
					>
						Step Down
					</button>

					<button
						className={styles.btn}
						type='button'
						onClick={() => handleChangeOrder('up')}
						disabled={currOrder === 1}
					>
						Step Up
					</button>
				</div>

				<div className={styles.bottom}>
					<button
						className='text-button'
						type='button'
						onClick={() => handleChangeOrder('bottom')}
						disabled={currOrder === habitsCount}
					>
						{currOrder === habitsCount ? 'Already at' : 'Move to'} Bottom
					</button>

					<button
						className='text-button'
						type='button'
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