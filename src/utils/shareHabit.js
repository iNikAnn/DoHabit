import html2canvas from 'html2canvas';

async function shareHabit(dataID) {
	const habitElement = document.querySelector(`div[data-id='${dataID}']`);

	const options = {
		backgroundColor: 'black',
		x: -20,
		y: -20,
		width: habitElement.offsetWidth + 40,
		height: habitElement.offsetHeight + 40,
		ignoreElements: (el) => el.getAttribute('data-name') === 'habitMenu'
	};

	const canvas = await html2canvas(habitElement, options);
	const image = canvas.toDataURL("image/jpeg", 1);
	const fileName = 'DoHabit_' + new Date().toDateString().replace(/ /g, '_');

	const blob = await fetch(image).then((res) => res.blob());
	const file = new File([blob], `${fileName}.jpg`, { type: 'image/jpeg' });

	const sharedData = {
		title: 'Share Habit',
		text: 'Check out my habit!',
		files: [file]
	};

	if ('share' in navigator) {
		try {
			await window.navigator.share(sharedData);
		} catch (error) {
			console.error('Error sharing data:', error);
		};
	} else {
		window.alert('Sharing is not supported!')
	};
}

export default shareHabit;