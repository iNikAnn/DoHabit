import { Navigate, RouteObject } from 'react-router-dom';
import { AchievementsPage } from '@pages/achievements';
import { AppearancePage } from '@pages/appearance';
import { ArchivePage } from '@pages/archive';
import { DataManagementPage } from '@pages/data-management';
import { DiaryPage } from '@pages/diary';
import { HabitEditorPage } from '@pages/habit-editor';
import { MainPage } from '@pages/main';
import { MenuPage } from '@pages/menu';
import { HabitStatisticsPage } from '@pages/habit-statistics';
import { MODAL_PATHS, ModalRouteKey } from '@shared/const';
import { ModalLayout } from '@shared/ui';

/**
 * Individual route definitions for modal sub-pages.
 */
export const modalChildRoutes: Record<ModalRouteKey, RouteObject> = {
	ACHIEVEMENTS: {
		path: MODAL_PATHS.ACHIEVEMENTS,
		element: <AchievementsPage />
	},
	APPEARANCE: {
		path: MODAL_PATHS.APPEARANCE,
		element: <AppearancePage />
	},
	ARCHIVE: {
		path: MODAL_PATHS.ARCHIVE,
		element: <ArchivePage />
	},
	DATA_MANAGEMENT: {
		path: MODAL_PATHS.DATA_MANAGEMENT,
		element: <DataManagementPage />
	},
	DIARY: {
		path: MODAL_PATHS.DIARY,
		element: <DiaryPage />
	},
	HABIT_EDITOR: {
		path: MODAL_PATHS.HABIT_EDITOR,
		element: <HabitEditorPage />
	},
	MENU: {
		path: MODAL_PATHS.MENU,
		element: <MenuPage />
	},
	STATISTICS: {
		path: MODAL_PATHS.STATISTICS,
		element: <HabitStatisticsPage />
	}
};

/**
 * Global route configuration.
 *
 * Note: Most functional pages are rendered as sub-routes
 * inside ModalLayout via React Router Outlet.
 *
 * @see {@link MODAL_PATHS} - Defined in shared/const/router.ts
 */
export const routeConfig: RouteObject[] = [
	{
		path: '/',
		element: <MainPage />
	},
	{
		path: '/modal',
		element: <ModalLayout />,
		children: Object.values(modalChildRoutes)
	},
	{
		/* Fallback for undefined routes */
		path: '*',
		element: <Navigate to='/' />
	}
];