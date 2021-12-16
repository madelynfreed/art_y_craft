/**
 * @jest-environment jsdom
 */
const diamond = require('./diamond')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
describe('changeSide', () => {
	it('works', () => {
	expect(diamond.testTest()).toBe("testy")
	})

	it('getIntersectionCoordinates', () => {
		const lightSource = { x: 920, y: 59 }
		const coordinateTop = { x: 189, y: 300 }
		const lightBottom = { x: 920, y: 559 }
		const coordinateBottom = { x: 220, y: 441 }
		expect(diamond.getIntersectionCoordinates(
			lightSource,
			coordinateTop,
			lightBottom,
			coordinateBottom
		)).toStrictEqual({"x": 920, "y": 59})
	})

	it('getFormula', () => {
		const lightSource = { x: 920, y: 59 }
		const coordinateTop = { x: 189, y: 300 }
		expect(diamond.getFormula(lightSource, coordinateTop)).toBe('loo')
	})
})