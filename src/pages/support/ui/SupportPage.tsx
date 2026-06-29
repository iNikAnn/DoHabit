import styles from './SupportPage.module.css';
import { Button } from '@shared/ui';

function SupportPage() {
	const testConnection = async () => {
		try {
			const response = await fetch('/api/top');
			const data = await response.text();
			alert(data);
		} catch (error) {
			console.error('Fetch failed', error);
		}
	};

	return (
		<div className={styles.pages}>
			<Button onClick={testConnection}>
				Hello
			</Button>
		</div>
	);
}

export { SupportPage };