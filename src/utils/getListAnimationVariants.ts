import { Variants } from 'framer-motion';

/**
 * Returns Framer Motion variants for list item animations.
 */
function getListAnimationVariants(duration: number): Variants {
	return {
		initial: {
			opacity: 0,
			scale: .75
		},

		animate: {
			opacity: 1,
			scale: 1,

			transition: {
				duration,
				ease: 'easeOut',
				delay: duration / 2
			}
		},

		exit: {
			opacity: 0,
			scale: .75,

			transition: {
				duration,
				ease: 'easeIn'
			}
		}
	};
}

export default getListAnimationVariants;