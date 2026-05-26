import type { Variants } from 'framer-motion';

export const variants: Variants = {
	initial: {
		y: '25%',
		opacity: 0,
	},

	animate: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 400,
			damping: 23
		}
	},

	exit: {
		y: '50%',
		opacity: 0,
		transition: {
			type: 'tween',
			duration: 0.15,
			ease: 'easeIn'
		}
	}
};