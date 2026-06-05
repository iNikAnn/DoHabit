import { useSettingsStore } from '@entities/settings';
import { type ListItemProps, Switch } from '@shared/ui';
import { useTranslation } from 'react-i18next';

function useListItems() {
	const { t } = useTranslation();
	const { settings, settingsDispatch } = useSettingsStore();

	const listItems: ListItemProps[] = [
		{
			title: t('settings.calendar.calendarTypeTitle'),
			description: t('settings.calendar.calendarTypeDescription', {
				type: t(`settings.calendar.${settings.calendarView ?? 'default'}`)
			}),
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
			title: t('settings.calendar.highlightTodayTitle'),
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
			title: t('settings.calendar.showWeekdayNamesTitle'),
			description: t('settings.calendar.showWeekdayNamesDesc'),
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
			title: t('settings.calendar.showDayNumbersTitle'),
			description: t('settings.calendar.showDayNumbersDesc'),
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

	return {
		listItems
	};
}

export default useListItems;