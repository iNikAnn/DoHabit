import type { Transition, Variants } from 'framer-motion';

const transition: Transition = {
	type: 'tween',
	ease: [0.2, 0, 0, 1],
	duration: 0.3
};

const variants: Variants = {
	initial: {
		x: '-20%',
		opacity: 0
	},

	animate: {
		x: '0%',
		opacity: 1,
		transition
	},

	exit: {
		x: '-20%',
		opacity: 0,
		transition
	}
};

export const pageMotionProps = {
	variants,
	initial: 'initial',
	animate: 'animate',
	exit: 'exit'
};