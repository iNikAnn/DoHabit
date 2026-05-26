import type { Variants } from 'framer-motion';

export const variants: Variants = {
	initial: {
		x: '-15%',
		scale: 0.92,
		opacity: 0
	},

	animate: {
		x: '0%',
		scale: 1,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 330,
			damping: 21
		}
	},

	exit: {
		x: '-15%',
		scale: 0.92,
		opacity: 0,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 30
		}
	}
};