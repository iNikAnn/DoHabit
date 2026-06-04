import styles from './AppearancePage.module.css';
import { CalendarSettings } from '@widgets/calendar-settings';
import { InterfaceSettings } from '@widgets/interface-settings';

/**
 * UI customization page.
 */
function AppearancePage() {
	return (
		<section className={styles.appearance}>
			<InterfaceSettings />
			<CalendarSettings />
		</section>
	);
}

export { AppearancePage };