const shadowColor = `blue`

function createCubeScene(id, topCoordinates, leftCoordinates) {
	console.log(id)
	const scene = document.createElement('div');
	const cube = document.createElement('div');
	const cube_front = document.createElement('div');
	const cube_back = document.createElement('div');
	const cube_right = document.createElement('div');
	const cube_left = document.createElement('div');
	const cube_top = document.createElement('div');
	const cube_bottom = document.createElement('div');
	const child_front = document.createElement('div');
	const child_back = document.createElement('div');
	const child_left = document.createElement('div');
	const shadow = document.createElement('div');

	scene.setAttribute("class", "scene")
	scene.style = `
			top: ${topCoordinates};
			left:${leftCoordinates};
	`
	cube.setAttribute('class', 'cube' );
	cube_front.setAttribute('class','cube__face cube__face--front');
	cube_back.setAttribute('class','cube__face cube__face--back');
	cube_right.setAttribute('class','cube__face cube__face--right');
	cube_left.setAttribute('class','cube__face cube__face--left');
	cube_top.setAttribute('class','cube__face cube__face--top');
	cube_bottom.setAttribute('class','cube__face cube__face--bottom');
	child_front.setAttribute('class', 'cube__child--front animate');
	child_back.setAttribute('class', 'cube__child--back animate');
	child_left.setAttribute('class', 'cube__child--left animate');

	cube.setAttribute('id', id );
	shadow.setAttribute('id', id);
	shadow.setAttribute('class', shadow);

	scene.appendChild(cube)
	cube.append(cube_front, cube_back, cube_right, cube_left, cube_top, cube_bottom)
	cube_front.appendChild(child_front)
	cube_back.appendChild(child_back)
	cube_left.appendChild(child_left)

	document.body.appendChild(scene)
	document.body.appendChild(shadow)
}

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

function getCoordinate(id, [cube_side, ySide], [other_cube_side, xSide]) {
	const yelement = document.getElementById(id).querySelector(`.cube__child--${cube_side}`)
	// console.log(yelement)
	// const yelement = document.querySelector(`.cube__child--${cube_side}`);
	const r = yelement.getBoundingClientRect()
	const y = r[ySide]

	// const xelement = document.querySelector(`.cube__child--${other_cube_side}`);
	const xelement = document.getElementById(id).querySelector(`.cube__child--${other_cube_side}`)
	// console.log(xelement)
	const s = xelement.getBoundingClientRect()
	const x = s[xSide]

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
	const x = ((b2 - b1) / (m1 - m2))
	const y = (m1 * x + b1)
	return { x, y }
}

function drawShadow(b1, b2, b3, intersection1, intersection2, intersection3) {
	// const shadowTag = document.getElementById(1).querySelector('#shadow')
	const shadowTag = document.getElementById('1 shadow')
	shadowTag.style = `
			width: 100vw;
			height: 100vh;
			background-color: ${shadowColor};
			clip-path: polygon(${b1.x}px ${b1.y}px,${intersection1.x}px ${intersection1.y}px,${intersection2.x}px ${intersection2.y}px,${intersection3.x}px ${intersection3.y}px,${b3.x}px ${b3.y}px,${b2.x}px ${b2.y}px);
			z-index: -5;
			`
}

function resizeObserver() {
	const resizeObserver = new ResizeObserver(entries => {
		orchestrateCoordinates(1)
	})
	resizeObserver.observe(document.querySelector('.animate'))
}

function orchestrateCoordinates(id) {
	const b1 = getCoordinate(id, ['bottom', 'bottom'], ['bottom', 'left'])
	const b2 = getCoordinate(id, ['bottom', 'top'], ['left', 'right'])
	const b3 = getCoordinate(id, ['bottom', 'top'], ['right', 'left'])
	const t1 = getCoordinate(id, ['front', 'bottom'], ['front', 'left'])
	const t2 = getCoordinate(id, ['back', 'top'], ['back', 'left'])
	const t3 = getCoordinate(id, ['back', 'top'], ['back', 'right'])

	const lt = {x: 1520, y: 234}
	const lb = {x: 1520, y: 734}

	const intersection1 = getIntersectionCoordinates(lt, t1, lb, b1);
	const intersection2 = getIntersectionCoordinates(lt, t2, lb, b2);
	const intersection3 = getIntersectionCoordinates(lt, t3, lb, b3);

	// console.log(b1, b2, b3, intersection1, intersection2, intersection3)
	drawShadow(b1, b2, b3, intersection1, intersection2, intersection3)
}
	
resizeObserver()
createCubeScene(0, '200px','200px')
// module.exports = { getFormula, getIntersectionCoordinates, testTest, orchestrateCoordinates }