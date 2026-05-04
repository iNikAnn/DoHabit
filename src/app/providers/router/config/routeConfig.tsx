import { Navigate, RouteObject } from 'react-router-dom';
import Achievements from '@/components/Achievements/Achievements';
import AppearanceSettings from '@/components/Appearance Settings/AppearanceSettings';
import Archive from '@/components/Archive/Archive';
import DataTransfer from '@/components/DataTransfer/DataTransfer';
import Diary from '@/components/Diary/Diary';
import HabitEditor from '@/components/HabitEditor/HabitEditor';
import { MainPage } from '@pages/main';
import Menu from '@/components/Menu/Menu';
import Statistics from '@/components/Statistics/Statistics';
import { modalPaths, ModalRouteKey } from '@shared/const';
import { ModalLayout } from '@shared/ui';

/**
 * Individual route definitions for modal sub-pages.
 */
export const modalChildRoutes: Record<ModalRouteKey, RouteObject> = {
	ACHIEVEMENTS: {
		path: modalPaths.ACHIEVEMENTS,
		element: <Achievements />
	},
	APPEARANCE: {
		path: modalPaths.APPEARANCE,
		element: <AppearanceSettings />
	},
	ARCHIVE: {
		path: modalPaths.ARCHIVE,
		element: <Archive />
	},
	DATA_TRANSFER: {
		path: modalPaths.DATA_TRANSFER,
		element: <DataTransfer />
	},
	DIARY: {
		path: modalPaths.DIARY,
		element: <Diary />
	},
	HABIT_EDITOR: {
		path: modalPaths.HABIT_EDITOR,
		element: <HabitEditor />
	},
	MENU: {
		path: modalPaths.MENU,
		element: <Menu />
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