const colors = [];
const colorsCount = 14;

for (let i = 0; i < colorsCount; i++) {
	colors.push(`hsl(${360 / colorsCount * i}, 60%, 60%)`);
};

export default colors;