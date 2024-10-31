import styles from '../../css/SectionHeader.module.css';

// components
import TextButton from '../Actions/TextButton';
import IconButton from '../Actions/IconButton';

// utils
import getCapitalizedText from '../../utils/getCapitalizedText';

function SectionHeader({ title, titleStyle, btn, btnText, btnIcon, btnOnClick }) {

	const capitalizedTitle = getCapitalizedText(title);

	const btnProps = {
		text: btnText,
		icon: btnIcon,
		onClick: btnOnClick
	};

	const buttons = {
		'textButton': <TextButton {...btnProps} />,
		'iconButton': <IconButton {...btnProps} />
	};

	return (
		<div className={styles.header}>
			<h4
				style={titleStyle}
				className={styles.title}
			>
				{capitalizedTitle}
			</h4>

			{btn && (
				buttons[btn]
			)}
		</div>
	);
}

export default SectionHeader;