import { getModalPath, type AppRouteKey } from './paths';
import type { RouteStateMap } from './types';

/**
 * Extracts history state for a specific route.
 */
export function getInitialRouteState<T extends AppRouteKey>(): RouteStateMap[T] | undefined {
	const rawState = window.history.state;
	if (!rawState) return;

	// Fallback to native state if router wrapper object is missing
	const pageState = rawState?.usr ?? rawState;

	return pageState as RouteStateMap[T];
}

/**
 * Generates a typed route configuration object for navigation.
 */
export function getNavigationTarget<T extends AppRouteKey>(
	route: T,
	state: { modalTitle: string } & RouteStateMap[T]
) {
	return {
		to: getModalPath(route),
		state
	};
}