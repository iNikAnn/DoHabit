import styles from './AppearancePage.module.css';
import { useSettingsStore } from '@entities/settings';
import { ThemeSettings } from '@widgets/theme-settings';
import { MenuItemProps, MenuList, Switch } from '@shared/ui';

/**
 * UI customization page.
 */
function AppearancePage() {
	const { settings, settingsDispatch } = useSettingsStore();

	const calendarItems: MenuItemProps[] = [
		{
			title: 'Compact Calendar View',
			description: `Current: ${settings.calendarView === 'compact' ? 'Compact' : 'Default'}`,
			extra: (
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
			)
		},
		{
			title: 'Highlight Today\'s Date',
			description: settings.calendarHighlightToday
				? 'Today is highlighted'
				: 'Today is not highlighted',
			extra: (
				<Switch
					isActive={settings.calendarHighlightToday ?? false}
					onClick={() => settingsDispatch({
						type: 'updateSettings',
						payload: {
							calendarHighlightToday: !settings.calendarHighlightToday
						}
					})}
				/>
			)
		}
	];

	return (
		<section className={styles.appearance}>
			<ThemeSettings />

			<MenuList
				title='Calendar'
				items={calendarItems}
			/>
		</section>
	);
}

export { AppearancePage };