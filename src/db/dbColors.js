const colors = [];
const colorsCount = 21;

for (let i = 0; i < colorsCount; i++) {
	colors.push(`hsl(${Math.floor(360 / colorsCount * i)}, 40%, 50%)`);
};

export default colors;