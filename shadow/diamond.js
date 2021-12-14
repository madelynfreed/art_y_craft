
function testTest() {
	return "testy"
}

function changeSide() {
	var cube = document.querySelector('.cube');
	var counter = 0;
	const directionList = ['front', 'right', 'back', 'left', 'top', 'bottom'];
	var currentClass = 'show-' + directionList[counter];
	cube.classList.remove(currentClass)
	counter = (counter + 1) % 6;
	var showClass = 'show-' + directionList[counter];
	cube.classList.add(showClass);
}

// document.addEventListener('click', changeSide);
function appendDiv(x, y) {
	const shadowTag = document.createElement('div');
	shadowTag.style = `
				background-color: blue;
				height: 10px;
				width: 10px;
				position: absolute;
				top: ${y}px;
				left: ${x}px;
			`
	document.body.appendChild(shadowTag);
}

function getCoordinate([cube_side, ySide], [other_cube_side, xSide]) {
	const yelement = document.querySelector(`.cube__face--${cube_side}`);
	const r = yelement.getBoundingClientRect()
	const y = Math.round(r[ySide])

	const xelement = document.querySelector(`.cube__face--${other_cube_side}`);
	const s = xelement.getBoundingClientRect()
	const x = Math.round(s[xSide])

	appendDiv(x, y)
	return { x, y }
}

function getLightSource(coordinates, yDiff) {
	console.log(coordinates)
	const x = coordinates.x + 500;
	const y = coordinates.y + yDiff;
	appendDiv(x, y)
	return { x, y }
}

function getIntersectionCoordinates(
	lightSource,
	coordinateTop,
	lightBottom,
	coordinateBottom,
) {
	// const { lightSourceX, lightSourceY } = lightSource
	// { coordinateTopX, coordinateTopY },
	// { lightBottomX, lightBottomY },
	// { coordinateBottomX, coordinateBottomY },
	const lightSourceX = lightSource.x
	const lightSourceY = lightSource.y
	const coordinateTopX = coordinateTop.x
	const coordinateTopY = coordinateTop.y
	const lightBottomX = lightBottom.x
	const lightBottomY = lightBottom.y
	const coordinateBottomX = coordinateBottom.x
	const coordinateBottomY = coordinateBottom.y
	console.log(arguments)
	const m1 = (lightSourceY - coordinateTopY) / (lightSourceX - coordinateTopX)
	const m2 = (lightBottomY - coordinateBottomY) / (lightBottomX - coordinateBottomX)
	console.log(m1, m2)
	const b1 = lightSourceY - (m1 * lightSourceX)
	const b2 = lightSourceY - (m2 * lightSourceX)
	console.log(b1, b2)
	console.log(`y = ${m1}x + ${b1}`)
	console.log(`y = ${m2}x + ${b2}`)
	const x = (b2 - b1) / (m1 - m2)
	const y = m1 * x + b1
	console.log(x, y)
	// const x = 100
	// const y = 100
	appendDiv(x, y)
	return { x, y }
}
function orchestrateCoordinates() {
	const b1 = getCoordinate(['bottom', 'bottom'], ['bottom', 'left'])
	const b2 = getCoordinate(['bottom', 'top'], ['left', 'right'])
	const b3 = getCoordinate(['bottom', 'top'], ['right', 'left'])
	const t1 = getCoordinate(['front', 'top'], ['front', 'left'])
	const t2 = getCoordinate(['back', 'top'], ['back', 'left'])
	const t3 = getCoordinate(['back', 'top'], ['back', 'right'])

	const lt = getLightSource(t3, -100)
	const lb = getLightSource(t3, 400)

	const intersection1 = getIntersectionCoordinates(lt, t1, lb, b1);

}

module.exports = { testTest }