/**
 * Relative paths for modal sub-routes.
 * Rendered via Outlet inside the ModalLayout.
 *
 * If a route requires navigation state, define it in `ExplicitRouteStates` (.types).
 */
export const ROUTES = {
	ACHIEVEMENTS: 'achievements',
	APPEARANCE: 'menu/appearance',
	ARCHIVE: 'menu/archive',
	DATA_MANAGEMENT: 'menu/data-management',
	DIARY: 'diary',
	HABIT_EDITOR: 'habit-editor',
	MENU: 'menu',
	STATISTICS: 'habit-statistics',
	STORAGE_INFO: 'menu/data-management/storage-info'
} as const;