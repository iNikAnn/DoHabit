import { useEffect, useRef } from 'react';

/**
 * Returns true only during the first render of the component.
 */
function useIsInitialRender(): boolean {
	const isFirstRender = useRef(true);

	useEffect(() => {
		isFirstRender.current = false
	}, []);

	return isFirstRender.current;
}

export default useIsInitialRender;
