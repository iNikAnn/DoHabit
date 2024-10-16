import { createContext, useReducer } from 'react';

// utils
import settingsReducer from '../utils/settingsReducer';

export const SettingsContext = createContext(null);
export const SettingsDispatchContext = createContext(null);

export function SettingsProvider({ children }) {
	const [settings, settingsDispatch] = useReducer(settingsReducer, {});

	return (
		<SettingsContext.Provider value={settings}>
			<SettingsDispatchContext.Provider value={settingsDispatch}>
				{children}
			</SettingsDispatchContext.Provider>
		</SettingsContext.Provider>
	);
}