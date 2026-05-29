import type { Variants } from 'framer-motion';

export const cardVariants: Variants = {
	initial: {
		scale: 0.9,
		opacity: 0
	},

	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 20
		}
	},

	exit: {
		scale: 0.9,
		opacity: 0,
		transition: { duration: 0.2 }
	}
};