import styles from '../../css/DataTransfer.module.css';

// components
import Placeholder from '../Placeholder';

// utils
import { exportAppData, importAppData } from '@shared/lib';

// icons
import { ExportIcon, ImportIcon } from '@shared/assets';
import { BsDatabaseFillUp } from 'react-icons/bs';
import { BsDatabaseFillDown } from 'react-icons/bs';

function DataTransfer() {
	return (
		<div className={styles.dataTransfer}>
			<div className={styles.placeholderWrapper}>
				<Placeholder
					image={<ExportIcon />}
					title='Export'
					desc='Save a backup of your habits data to your device.'
					textOnButton='Export Now'
					buttonIcon={<BsDatabaseFillUp />}
					onClick={exportAppData}
					accentColor='#57a639'
				/>
			</div>

			<div className={styles.placeholderWrapper}>
				<Placeholder
					image={<ImportIcon />}
					title='Import'
					desc='Upload your habits data from a backup file.'
					textOnButton='Import Now'
					buttonIcon={<BsDatabaseFillDown />}
					onClick={importAppData}
				/>
			</div>
		</div>
	);
}

export default DataTransfer;