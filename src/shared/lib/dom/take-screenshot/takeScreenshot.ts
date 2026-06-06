import i18n from 'i18next';
import html2canvas, { type Options } from 'html2canvas-pro';

/**
 * Captures an element as an image and opens the native sharing dialog.
 */
async function takeScreenshot(element: HTMLElement) {
	// Check if the Web Share API is available
	if (!navigator?.share) {
		window.alert(i18n.t('habits.share.notSupported'));
		return;
	}

	const options: Partial<Options> = {
		backgroundColor: 'black',
		x: -20,
		y: -20,
		width: element.offsetWidth + 40,
		height: element.offsetHeight + 40,
		ignoreElements: (el) => el.getAttribute('data-screenshot-ignore') === 'true'
	};

	// Convert element to canvas
	const canvas = await html2canvas(element, options);

	// Create a file from canvas
	const blob = await new Promise<Blob | null>((resolve) => {
		canvas.toBlob(resolve, 'image/jpeg', 1)
	});

	if (!blob) {
		window.alert(i18n.t('habits.share.error'));
		return;
	}

	const fileName = `DoHabit_${Date.now()}.jpg`;
	const file = new File([blob], fileName, { type: 'image/jpeg' });

	const sharedData: ShareData = {
		title: i18n.t('habits.share.title'),
		text: i18n.t('habits.share.desc'),
		files: [file]
	};

	try {
		await window.navigator.share(sharedData);
	} catch (error) {
		console.error('Error sharing data:', error);
	}
}

export { takeScreenshot };