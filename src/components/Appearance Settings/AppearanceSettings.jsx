import styles from '../../css/appearanceSettings.module.css';

// stores
import { useSettingsStore } from '../../stores/settingsStore';

// components
import MenuItemList from '../Menu/MenuItemList';
import MenuItem from '../Menu/MenuItem';
import Switch from '../Selection/Switch';

function AppearanceSettings() {

	const settings = useSettingsStore((s) => s.settings);
	const settingsDispatch = useSettingsStore((s) => s.settingsDispatch);

	return (
		<section className={styles.appearance}>
			<MenuItemList title="Color Theme">
				<MenuItem
					title="Force Dark Mode"
					desc={`Current: ${settings.isDarkSchemeForced ? 'Dark' : 'System'}`}
					other={
						<Switch
							isActive={settings.isDarkSchemeForced}
							onClick={() => settingsDispatch({
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
							onClick={() => settingsDispatch({
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
							onClick={() => settingsDispatch({
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