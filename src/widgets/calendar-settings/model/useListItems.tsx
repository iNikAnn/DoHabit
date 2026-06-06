import { useSettingsStore } from '@entities/settings';
import { type ListItemProps, Switch } from '@shared/ui';
import { useTranslation } from 'react-i18next';

function useListItems() {
	const { t } = useTranslation();
	const { settings, settingsDispatch } = useSettingsStore();

	const listItems: ListItemProps[] = [
		{
			title: t('menu.appearance.calendar.typeTitle'),
			description: t('menu.appearance.calendar.typeDesc', {
				type: t(`menu.appearance.calendar.${settings.calendarView ?? 'default'}`)
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
			title: t('menu.appearance.calendar.highlightToday.title'),
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
			title: t('menu.appearance.calendar.showWeekdayNames.title'),
			description: t('menu.appearance.calendar.showWeekdayNames.desc'),
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
			title: t('menu.appearance.calendar.showDayNumbers.title'),
			description: t('menu.appearance.calendar.showDayNumbers.desc'),
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