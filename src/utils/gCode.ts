import firebaseApp from '../config/firebase';

const LETTERS_REF = firebaseApp.firestore().collection('letters');

const mapLettersToObject = (snap: firebase.firestore.QuerySnapshot) => {
	let codedLetters: any = {};
	snap.forEach(doc => (codedLetters[doc.id.toUpperCase()] = doc.data().code));
	return codedLetters;
};

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
