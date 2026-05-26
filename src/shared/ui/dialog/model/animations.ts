import type { Variants } from 'framer-motion';

export const variants: Variants = {
	initial: {
		y: '-30%',
		x: '-50%',
		opacity: 0
	},

	animate: {
		y: '-50%',
		x: '-50%',
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 400,
			damping: 23
		}
	},

	exit: {
		y: '-30%',
		x: '-50%',
		opacity: 0,
		transition: {
			type: 'tween',
			duration: 0.15,
			ease: 'easeIn'
		}
	}
};