import { TargetAndTransition, useAnimate, useMotionValue } from 'framer-motion';

interface DragActionOptions {
	threshold?: number;
	successAnimation?: TargetAndTransition;
	onAction: () => void;
}

/**
 * A universal hook for handling drag gestures and triggering actions.
 */
function useDragAction(options: DragActionOptions) {
	const {
		threshold = 50,
		successAnimation,
		onAction
	} = options;

	const [scope, animate] = useAnimate();
	const motionValue = useMotionValue(0);

	const handleDragEnd = async () => {
		const offset = motionValue.get();

		// Trigger action if threshold is met
		if (offset >= threshold) {
			if (successAnimation) {
				await animate(scope.current, successAnimation, {
					duration: .15,
					ease: 'easeOut'
				});
			}

			onAction();
		}
	};

	return {
		scope,
		motionValue,
		handleDragEnd
	};
}

export { useDragAction };