import type { Variants } from 'framer-motion';
import type { Direction } from '@shared/lib/router';

const variants: Variants = {
	initial: (direction: Direction) => {
		return direction === 'forward'
			? {
				x: '20%',
				opacity: 0
			}
			: {
				x: '-20%',
				opacity: 0
			};
	},

	animate: {
		x: 0,
		opacity: 1,
		transition: {
			type: 'tween',
			ease: [0.2, 0, 0, 1],
			duration: 0.3,
		}
	},

	exit: (direction: Direction) => ({
		x: direction === 'forward' ? '-20%' : '20%',
		opacity: 0,
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