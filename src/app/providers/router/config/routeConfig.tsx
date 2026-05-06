import { Navigate, RouteObject } from 'react-router-dom';
import { AchievementsPage } from '@pages/achievements';
import { AppearancePage } from '@pages/appearance';
import Archive from '@/components/Archive/Archive';
import { DataManagementPage } from '@pages/data-management';
import { DiaryPage } from '@pages/diary';
import { HabitEditorPage } from '@pages/habit-editor';
import { MainPage } from '@pages/main';
import { MenuPage } from '@pages/menu';
import Statistics from '@/components/Statistics/Statistics';
import { modalPaths, ModalRouteKey } from '@shared/const';
import { ModalLayout } from '@shared/ui';

/**
 * Individual route definitions for modal sub-pages.
 */
export const modalChildRoutes: Record<ModalRouteKey, RouteObject> = {
	ACHIEVEMENTS: {
		path: modalPaths.ACHIEVEMENTS,
		element: <AchievementsPage />
	},
	APPEARANCE: {
		path: modalPaths.APPEARANCE,
		element: <AppearancePage />
	},
	ARCHIVE: {
		path: modalPaths.ARCHIVE,
		element: <Archive />
	},
	DATA_MANAGEMENT: {
		path: modalPaths.DATA_MANAGEMENT,
		element: <DataManagementPage />
	},
	DIARY: {
		path: modalPaths.DIARY,
		element: <DiaryPage />
	},
	HABIT_EDITOR: {
		path: modalPaths.HABIT_EDITOR,
		element: <HabitEditorPage />
	},
	MENU: {
		path: modalPaths.MENU,
		element: <MenuPage />
	},
	STATISTICS: {
		path: modalPaths.STATISTICS,
		element: <Statistics />
	}
};

/**
 * Global route configuration.
 *
 * Note: Most functional pages are rendered as sub-routes
 * inside ModalLayout via React Router Outlet.
 *
 * @see {@link modalPaths} - Defined in shared/const/router.ts
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