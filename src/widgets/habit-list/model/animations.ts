import { type Variants } from 'framer-motion';

const cardVariants: Variants = {
	initial: {
		opacity: 0,
		y: 12,
		scale: 0.98
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 25,
			delay: index * 0.05
		}
	})
};

export const getCardMotionProps = (index: number) => ({
	variants: cardVariants,
	initial: 'initial',
	animate: 'animate',
	custom: index
});