/**
 * Relative paths for modal sub-routes.
 * Rendered via Outlet inside the ModalLayout.
 */
export const ROUTES = {
	ACHIEVEMENTS: 'achievements',
	APPEARANCE: 'menu/appearance',
	ARCHIVE: 'menu/archive',
	DATA_MANAGEMENT: 'menu/data-management',
	DIARY: 'diary',
	HABIT_EDITOR: 'habit-editor',
	MENU: 'menu',
	STATISTICS: 'habit-statistics'
} as const;

export type AppRouteKey = keyof typeof ROUTES;

/**
 * Returns the absolute application path for a specific modal route.
 */
export const getModalPath = (key: AppRouteKey) => {
	return `/modal/${ROUTES[key]}`;
};