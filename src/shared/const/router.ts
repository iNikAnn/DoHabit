/**
 * Relative paths for modal sub-routes.
 * Rendered via Outlet inside the ModalLayout.
 */
export const MODAL_PATHS = {
	ACHIEVEMENTS: 'achievements',
	APPEARANCE: 'menu/appearance',
	ARCHIVE: 'menu/archive',
	DATA_MANAGEMENT: 'menu/data-management',
	DIARY: 'diary',
	HABIT_EDITOR: 'habit-editor',
	MENU: 'menu',
	STATISTICS: 'habit-statistics'
} as const;

export type ModalRouteKey = keyof typeof MODAL_PATHS;

/**
 * Returns the absolute application path for a specific modal route.
 */
export const getModalPath = (key: ModalRouteKey) => {
	return `/modal/${MODAL_PATHS[key]}`;
};