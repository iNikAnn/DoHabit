import { useState } from 'react';
import { getInitialRouteState } from '../helpers';
import type { AppRouteKey } from '../paths';
import type { RouteStateMap } from '../types';

function useInitialRouteState<T extends AppRouteKey>() {
	const [pageState] = useState<Partial<RouteStateMap[T]>>(
		() => getInitialRouteState<T>() ?? {}
	);

	return pageState;
}

export { useInitialRouteState };