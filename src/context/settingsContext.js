import { createContext, useReducer } from 'react';

// utils
import settingsReducer from '../utils/settingsReducer';
import initSettings from '../utils/initSettings';

export const SettingsContext = createContext(null);
export const SettingsDispatchContext = createContext(null);

export function SettingsProvider({ children }) {
	const [settings, settingsDispatch] = useReducer(settingsReducer, null, initSettings);

	return (
		<SettingsContext.Provider value={settings}>
			<SettingsDispatchContext.Provider value={settingsDispatch}>
				{children}
			</SettingsDispatchContext.Provider>
		</SettingsContext.Provider>
	);
}