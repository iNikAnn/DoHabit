import type { Variants } from 'framer-motion';
import type { Direction } from '@shared/lib/router';

export const variants: Variants = {
	initial: (direction: Direction) => {
		return direction === 'forward'
			? {
				x: '75%',
				scale: 1,
				opacity: 0
			}
			: {
				x: '-20%',
				scale: 0.9,
				opacity: 0
			};
	},

	animate: (direction: Direction) => ({
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 330,
			damping: direction === 'forward' ? 23 : 21
		}
	}),

	exit: (direction: Direction) => ({
		x: direction === 'forward' ? '-20%' : '75%',
		scale: direction == 'forward' ? 0.9 : 1,
		opacity: 0,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 30
		}
	})
};