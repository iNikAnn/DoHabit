import styles from '../../css/appearanceSettings.module.css';

// react
import { useContext } from 'react';

// context
import { SettingsContext, SettingsDispatchContext } from '../../context/settingsContext';

// components
import Switch from '../Selection/Switch';
import MenuItem from '../Menu/MenuItem';

function AppearanceSettings() {

	const settings = useContext(SettingsContext);
	const updateSettings = useContext(SettingsDispatchContext);

	return (
		<section className={styles.appearance}>
			<div className={styles.category}>
				<h4>Calendar</h4>

				<ul className={styles.list}>
					<MenuItem
						title="Compact Calendar View"
						desc={`Currently enabled: ${settings.calendarView ?? 'default'}`}
						other={
							<Switch
								isActive={settings.calendarView === 'compact'}
								onClick={() => updateSettings({
									calendarView: settings.calendarView === 'compact' ? 'default' : 'compact'
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
				</ul>
			</div>
		</section>
	);
}

export default AppearanceSettings;