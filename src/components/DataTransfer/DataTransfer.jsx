import styles from '../../css/DataTransfer.module.css';

// components
import Placeholder from '../Placeholder';

// icons
import { ReactComponent as Upload } from '../../img/upload.svg'

function DataTransfer({ onExport }) {
	return (
		<div className={styles.dataTransfer}>
			<div className={styles.placeholderWrapper}>
				<Placeholder
					image={<Upload />}
					title="Export Your Data"
					desc="Save a backup of your habits data to your device."
					textOnButton="Export Now"
					onClick={onExport}
				/>
			</div>
		</div>
	)
}

export default DataTransfer;