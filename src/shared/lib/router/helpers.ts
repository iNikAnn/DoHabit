import { ROUTES } from './paths';
import type { AppRouteKey, PageState } from './types';

/**
 * Extracts history state for a specific route.
 */
export const getInitialRouteState = <T extends AppRouteKey>(): PageState<T> | undefined => {
	const rawState = window.history.state;
	if (!rawState) return;

	// Fallback to native state if router wrapper object is missing
	const pageState = rawState?.usr ?? rawState;

	return pageState as PageState<T>;
}

/**
 * Returns the absolute application path for a specific modal route.
 */
export const getModalPath = (key: AppRouteKey) => {
	return `/modal/${ROUTES[key]}`;
};

/**
 * Generates a typed route configuration object for navigation.
 */
export const getNavigationTarget = <T extends AppRouteKey>(route: T, state: PageState<T>) => {
	return {
		to: getModalPath(route),
		state
	};
}