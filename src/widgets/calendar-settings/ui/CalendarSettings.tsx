import { useSettingsStore } from '@entities/settings';
import { MenuItemProps, MenuList, Switch } from '@shared/ui';

function CalendarSettings() {
	const { settings, settingsDispatch } = useSettingsStore();

	const calendarItems: MenuItemProps[] = [
		{
			title: 'Compact calendar view',
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
			title: 'Highlight today\'s date',
			description: settings.calendarHighlightToday
				? 'Today is highlighted'
				: 'Today is not highlighted',
			extra: (
				<Switch
					isActive={settings.calendarHighlightToday}
					onClick={() => settingsDispatch({
						type: 'updateSettings',
						payload: {
							calendarHighlightToday: !settings.calendarHighlightToday
						}
					})}
				/>
			)
		},
		{
			title: 'Show weekday names',
			description: 'Applies to the default calendar only',
			extra: (
				<Switch
					isActive={settings.calendarShowDayNames}
					onClick={() => settingsDispatch({
						type: 'updateSettings',
						payload: {
							calendarShowDayNames: !settings.calendarShowDayNames
						}
					})}
				/>
			)
		},
		{
			title: 'Show day numbers',
			description: 'Applies to the default calendar only',
			extra: (
				<Switch
					isActive={settings.calendarShowDayNumbers}
					onClick={() => settingsDispatch({
						type: 'updateSettings',
						payload: {
							calendarShowDayNumbers: !settings.calendarShowDayNumbers
						}
					})}
				/>
			)
		}
	];

	return (
		<MenuList
			title='Calendar'
			items={calendarItems}
		/>
	);
}

export { CalendarSettings };