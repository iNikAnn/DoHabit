import { useEffect, useRef } from "react";

function useIsInitialRender() {
	const isFirstRender = useRef(true);

	useEffect(() => { isFirstRender.current = false }, []);

	return isFirstRender.current;
}

export default useIsInitialRender;