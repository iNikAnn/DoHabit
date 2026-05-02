import html2canvas, { Options } from 'html2canvas';

/**
 * Captures an element as an image and opens the native sharing dialog.
 */
async function shareElementScreenshot(element: HTMLDivElement) {
	// Check if the Web Share API is available
	if (!navigator?.share) {
		window.alert('Sharing is not supported.');
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
		window.alert('Failed to generate image.');
		return;
	}

	const fileName = `DoHabit_${Date.now()}.jpg`;
	const file = new File([blob], fileName, { type: 'image/jpeg' });

	const sharedData: ShareData = {
		title: 'Share',
		text: 'Look at this!',
		files: [file]
	};

	try {
		await window.navigator.share(sharedData);
	} catch (error) {
		console.error('Error sharing data:', error);
	}
}

export { shareElementScreenshot };