import styles from '../../css/appearanceSettings.module.css';

// react
import { useContext } from 'react';

// context
import { SettingsContext, SettingsDispatchContext } from '../../context/settingsContext';

// components
import MenuItemList from '../Menu/MenuItemList';
import MenuItem from '../Menu/MenuItem';
import Switch from '../Selection/Switch';

function AppearanceSettings() {

	const settings = useContext(SettingsContext);
	const updateSettings = useContext(SettingsDispatchContext);

	return (
		<section className={styles.appearance}>
			<MenuItemList title="Color Theme">
				<MenuItem
					title="Force Dark Mode"
					desc={`Current: ${settings.isDarkSchemeForced ? 'Dark' : 'System'}`}
					other={
						<Switch
							isActive={settings.isDarkSchemeForced}
							onClick={() => updateSettings({
								isDarkSchemeForced: !settings.isDarkSchemeForced
							})}
						/>
					}
				/>
			</MenuItemList>

			<MenuItemList title="Calendar">
				<MenuItem
					title="Compact Calendar View"
					desc={`Current: ${settings.calendarView === 'compact' ? 'Compact' : 'Default'}`}
					other={
						<Switch
							isActive={settings.calendarView === 'compact'}
							onClick={() => updateSettings({
								calendarView: settings.calendarView === 'compact'
									? 'default'
									: 'compact'
							})}
						/>
					}
				/>

				<MenuItem
					title="Highlight Today's Date"
					desc={(settings.calendarHighlightToday ?? true)
						? 'Today is highlighted'
						: 'Today is not highlighted'}
					other={
						<Switch
							isActive={settings.calendarHighlightToday ?? true}
							onClick={() => updateSettings({
								calendarHighlightToday: !(settings.calendarHighlightToday ?? true)
							})}
						/>
					}
				/>
			</MenuItemList>
		</section>
	);
}

export default AppearanceSettings;