import firebaseApp from '../config/firebase';
const TextToSVG = require('text-to-svg');
// const textToSVG = null; //TextToSVG.loadSync();
// const textToSVG = TextToSVG.loadSync('/fonts/Noto-Sans.otf');

// const hersheyText = require('hersheytext');

const LETTERS_REF = firebaseApp.firestore().collection('letters');

const mapLettersToObject = (snap: firebase.firestore.QuerySnapshot) => {
	let codedLetters: any = {};
	snap.forEach(doc => (codedLetters[doc.id.toUpperCase()] = doc.data().code));
	return codedLetters;
};

export const generateSvgGCode = (text: string) => {
	// TextToSVG.load('/HersheyScript1.svg', function(err: any, textToSVG: any) {
	// TextToSVG.load('/ORTE1LOT.otf', function(err: any, textToSVG: any) {
		TextToSVG.load('/ORTE1LOT.otf', function(err: any, textToSVG: any) {
		if (err) {
			console.error(err);
		} else {
			const attributes = { fill: 'red', stroke: 'black' };
			const options = { x: 0, y: 0, fontSize: 72, anchor: 'top', attributes: attributes };

			const svg = textToSVG.getSVG(text, options);
			console.log(svg);
			return svg;
		}
	});
};

// export const generateHersheyGCode = (text: string) => {
// 	const svgText = hersheyText.renderTextSVG('testing', {
// 		id: 'running',
// 		font: 'hershey_sans_1',
// 		charHeight: 10,
// 		charWidth: 10,
// 		pos: { x: 50, y: 50 }
// 	});

// 	if (svgText !== false) {
// 		console.log('SVG XML:\n', svgText, '\n\n');
// 	}

// 	const arrayText = hersheyText.renderTextArray(text);

// 	if (arrayText !== false) {
// 		console.log('Array of character data:\n', arrayText);
// 	}
// 	return arrayText;

// 	// console.log('\n\nFonts available:');
// 	// for (var key in hersheyText.getFonts) {
// 	// 	var f = hersheyText.fonts[key];
// 	// 	console.log(`Hershey font "${key}":, ${f.name}`);
// 	// }
// 	// for (var key in hersheyText.svgFonts) {
// 	// 	var f = hersheyText.svgFonts[key];
// 	// 	console.log(`SVG font "${key}":, ${f.name}`);
// 	// }
// 	return 'code';
// };
export const generateGCode = async (text: string) => {
	const textToGenerate = text.toUpperCase();
	let Gcode = '';
	let codedLetters: any = {};
	await LETTERS_REF.get().then(snap => (codedLetters = mapLettersToObject(snap)));

	for (let index = 0; index < textToGenerate.length; index++) {
		const char = textToGenerate.charAt(index);
		Gcode += codedLetters[char];
	}

	return Gcode;
};

export const saveNewGCode = (letter: string, newgcode: string) =>
	firebaseApp
		.firestore()
		.collection('letters')
		.doc(letter)
		.set({ code: newgcode });

export const getAllLetters = (onUpdate: (value: any) => void) =>
	LETTERS_REF.onSnapshot(snap => onUpdate(mapLettersToObject(snap)), console.error);
