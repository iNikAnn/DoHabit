import styles from './AppearancePage.module.css';

// stores
import { useSettingsStore } from '../../../stores/settingsStore';

// components
import MenuItemList from '../../../components/Menu/MenuItemList';
import MenuItem from '../../../components/Menu/MenuItem';
import Switch from '../../../components/Selection/Switch';

/**
 * UI customization page.
 */
function AppearancePage() {

	const { settings, settingsDispatch } = useSettingsStore();

	return (
		<section className={styles.appearance}>
			<MenuItemList title="Color Theme">
				<MenuItem
					title="Force Dark Mode"
					desc={`Current: ${settings.isDarkSchemeForced ? 'Dark' : 'System'}`}
					other={
						<Switch
							isActive={!!settings.isDarkSchemeForced}
							onClick={() => settingsDispatch({
								type: 'updateSettings',
								payload: {
									isDarkSchemeForced: !settings.isDarkSchemeForced
								}
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
								type: 'updateSettings',
								payload: {
									calendarView: settings.calendarView === 'compact'
										? 'default'
										: 'compact'
								}
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
								type: 'updateSettings',
								payload: {
									calendarHighlightToday: !(settings.calendarHighlightToday ?? true)
								}
							})}
						/>
					}
				/>
			</MenuItemList>
		</section>
	);
}

export { AppearancePage };