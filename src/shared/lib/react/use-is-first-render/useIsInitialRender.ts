import { useEffect, useRef } from 'react';

/**
 * Returns true only during the first render of the component.
 */
function useIsFirstRender(): boolean {
	const renderRef = useRef(true);

	useEffect(() => {
		renderRef.current = false;
	}, []);

	return renderRef.current;
}

export { useIsFirstRender };
