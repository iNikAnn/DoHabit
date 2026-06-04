import { useState } from 'react';
import { getInitialRouteState } from '../helpers';
import type { AppRouteKey, PageState } from '../types';

function useInitialRouteState<T extends AppRouteKey>() {
	const [pageState] = useState<Partial<PageState<T>>>(
		() => getInitialRouteState<T>() ?? {}
	);

	return pageState;
}

export { useInitialRouteState };