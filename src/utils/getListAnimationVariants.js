function getListAnimationVariants(duration) {
	return {
		initial: { opacity: 0, scale: .75 },

		animate: {
			opacity: 1,
			scale: 1,

			transition: {
				duration: duration,
				ease: 'easeOut',
				delay: duration
			}
		},

		exit: {
			opacity: 0,
			scale: .75,

		},

		transition: {
			duration: duration,
			ease: 'easeOut',
		}
	};
}

export default getListAnimationVariants;