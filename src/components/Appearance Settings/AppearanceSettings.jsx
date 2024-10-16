import styles from '../../css/appearanceSettings.module.css';

// react
import { useContext } from 'react';

// context
import { SettingsContext, SettingsDispatchContext } from '../../context/settingsContext';

// components
import Switch from '../Selection/Switch';

function AppearanceSettings() {

	const settings = useContext(SettingsContext);
	const updateSettings = useContext(SettingsDispatchContext);

	return (
		<section className={styles.appearance}>
			<div className={styles.category}>
				<h4>Calendar</h4>

				<ul className={styles.list}>
					<li className={styles.item}>
						<div>
							<h3>Compact Calendar View</h3>
							<small>{`Currently enabled: ${settings.calendarView ?? 'default'}`}</small>
						</div>

						<Switch
							isActive={settings.calendarView === 'compact'}
							onClick={() => updateSettings({
								calendarView: settings.calendarView === 'compact' ? 'default' : 'compact'
							})}
						/>
					</li>
				</ul>
			</div>
		</section>
	);
}

export default AppearanceSettings;