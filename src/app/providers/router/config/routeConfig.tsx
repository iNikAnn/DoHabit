import { Navigate, RouteObject } from 'react-router-dom';
import Achievements from '@/components/Achievements/Achievements';
import AppearanceSettings from '@/components/Appearance Settings/AppearanceSettings';
import Archive from '@/components/Archive/Archive';
import DataTransfer from '@/components/DataTransfer/DataTransfer';
import Diary from '@/components/Diary/Diary';
import HabitEditor from '@/components/HabitEditor/HabitEditor';
import MainPage from '@/components/MainPage';
import Menu from '@/components/Menu/Menu';
import Statistics from '@/components/Statistics/Statistics';
import { modalPaths, ModalRouteKey } from '@shared/const';
import { ModalLayout } from '@shared/ui';

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
		path: '*',
		element: <Navigate to='/' />
	}
];