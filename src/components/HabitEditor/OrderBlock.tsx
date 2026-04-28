import styles from '../../css/OrderBlock.module.css';

interface Props {
	habitsCount: number;
	currentOrder: number;
	setCurrentOrder: React.Dispatch<React.SetStateAction<number>>;
}

function OrderBlock({ habitsCount, currentOrder, setCurrentOrder }: Props) {
	const handleChangeOrder = (dir: 'top' | 'bottom' | 'up' | 'down') => {
		setCurrentOrder((order) => {
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
						value={currentOrder}
						tabIndex={-1}
						readOnly
					/>

					<button
						className={styles.btn}
						type='button'
						onClick={() => handleChangeOrder('down')}
						disabled={currentOrder === habitsCount}
					>
						Step Down
					</button>

					<button
						className={styles.btn}
						type='button'
						onClick={() => handleChangeOrder('up')}
						disabled={currentOrder === 1}
					>
						Step Up
					</button>
				</div>

				<div className={styles.bottom}>
					<button
						className='text-button'
						type='button'
						onClick={() => handleChangeOrder('bottom')}
						disabled={currentOrder === habitsCount}
					>
						{currentOrder === habitsCount ? 'Already at' : 'Move to'} Bottom
					</button>

					<button
						className='text-button'
						type='button'
						onClick={() => handleChangeOrder('top')}
						disabled={currentOrder === 1}
					>
						{currentOrder === 1 ? 'Already at' : 'Move to'} Top
					</button>
				</div>
			</div>
		</section>
	);
}

export default OrderBlock;