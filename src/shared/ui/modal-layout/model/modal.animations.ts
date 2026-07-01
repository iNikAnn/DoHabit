import type { Variants } from 'framer-motion';
import type { Direction } from '@shared/lib/router';

const variants: Variants = {
	initial: (direction: Direction) => {
		return direction === 'forward'
			? {
				x: '50%',
				opacity: 0,
				scale: 1
			}
			: {
				x: '-25%',
				opacity: 0,
				scale: 0.92
			};
	},

	animate: {
		x: 0,
		opacity: 1,
		scale: 1,
		transition: {
			type: 'tween',
			ease: [0.2, 0, 0, 1],
			duration: 0.3,
		}
	},

	exit: (direction: Direction) => ({
		x: direction === 'forward' ? '-25%' : '50%',
		opacity: 0,
		scale: direction === 'forward' ? 0.92 : 1,
		transition: {
			type: 'tween',
			ease: [0.3, 0, 1, 1],
			duration: 0.2
		}
	})
};

export const modalMotionProps = {
	variants,
	initial: 'initial',
	animate: 'animate',
	exit: 'exit'
};