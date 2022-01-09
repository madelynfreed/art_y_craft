function appendDiv(x, y, logIt = false) {
	const shadowTag = document.createElement('div');
	shadowTag.style = `
				background-color: blue;
				position: absolute;
				top: ${y}px;
				left: ${x}px;
			`
	if (logIt) {
		shadowTag.style.height = '10px'
		shadowTag.style.width = '10px'
		console.log(x,y)
	}
	document.body.appendChild(shadowTag);
}

function getCoordinate([cube_side, ySide], [other_cube_side, xSide]) {
	const yelement = document.querySelector(`.cube__child--${cube_side}`);
	const r = yelement.getBoundingClientRect()
	const y = Math.round(r[ySide])

	const xelement = document.querySelector(`.cube__child--${other_cube_side}`);
	const s = xelement.getBoundingClientRect()
	const x = Math.round(s[xSide])

	// appendDiv(x, y)
	return { x, y }
}

function getIntersectionCoordinates(
	lightSource,
	coordinateTop,
	lightBottom,
	coordinateBottom,
) {
	const m1 = (lightSource.y - coordinateTop.y) / (lightSource.x - coordinateTop.x)
	const m2 = (lightBottom.y - coordinateBottom.y) / (lightBottom.x - coordinateBottom.x)
	const b1 = lightSource.y - (m1 * lightSource.x)
	const b2 = lightBottom.y - (m2 * lightBottom.x)
	const x = Math.round((b2 - b1) / (m1 - m2))
	const y = Math.round(m1 * x + b1)
	return { x, y }
}

const shadowTag = document.querySelector('#shadow')
function drawShadow(b1, b2, b3, intersection1, intersection2, intersection3) {
	shadowTag.style = `
			width: 100vw;
			height: 100vh;
			background-color: green;
			clip-path: polygon(${b1.x}px ${b1.y}px,${intersection1.x}px ${intersection1.y}px,${intersection2.x}px ${intersection2.y}px,${intersection3.x}px ${intersection3.y}px,${b3.x}px ${b3.y}px,${b2.x}px ${b2.y}px);
			z-index: -5;
			`
}

function resizeObserver() {
	const resizeObserver = new ResizeObserver(entries => {
		// console.log(entries[0].target.getBoundingClientRect())
		orchestrateCoordinates()
	})
	resizeObserver.observe(document.querySelector('.cube__child--back'))
	resizeObserver.observe(document.querySelector('.cube__child--left'))
	resizeObserver.observe(document.querySelector('.cube__face--front'))
}

function orchestrateCoordinates() {
	const b1 = getCoordinate(['bottom', 'bottom'], ['bottom', 'left'])
	const b2 = getCoordinate(['bottom', 'top'], ['left', 'right'])
	const b3 = getCoordinate(['bottom', 'top'], ['right', 'left'])
	const t1 = getCoordinate(['front', 'bottom'], ['front', 'left'])
	const t2 = getCoordinate(['back', 'top'], ['back', 'left'])
	const t3 = getCoordinate(['back', 'top'], ['back', 'right'])

	const lt = {x: 1520, y: 234}
	const lb = {x: 1520, y: 734}

	const intersection1 = getIntersectionCoordinates(lt, t1, lb, b1);
	const intersection2 = getIntersectionCoordinates(lt, t2, lb, b2);
	const intersection3 = getIntersectionCoordinates(lt, t3, lb, b3);

	drawShadow(b1, b2, b3, intersection1, intersection2, intersection3)
}
	
resizeObserver()
module.exports = { getFormula, getIntersectionCoordinates, testTest, orchestrateCoordinates }