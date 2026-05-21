import styles from './AppearancePage.module.css';
import { CalendarSettings } from '@widgets/calendar-settings';
import { ThemeSettings } from '@widgets/theme-settings';

/**
 * UI customization page.
 */
function AppearancePage() {
	return (
		<section className={styles.appearance}>
			<ThemeSettings />
			<CalendarSettings />
		</section>
	);
}

export { AppearancePage };