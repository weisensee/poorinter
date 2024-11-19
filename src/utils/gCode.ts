import firebaseApp from '../config/firebase';
import {
    getFirestore,
    collection,
    getDocs,
    QuerySnapshot,
    setDoc,
    doc,
    query,
    onSnapshot,
} from 'firebase/firestore';
const __DEV__ = process.env.NODE_ENV !== 'production';
console.log(`__DEV__: ${__DEV__}`);
const BASE_URL = __DEV__
    ? 'http://localhost:5000/poop-rinter/us-central1/app'
    : 'https://us-central1-poop-rinter.cloudfunctions.net/app';
const TEXT_TO_SVG_URL = `${BASE_URL}/textToSVG/`;
const HERSHEYS_URL = `${BASE_URL}/hersheySVG/`;

const LETTERS_REF = collection(getFirestore(), 'letters');

const mapLettersToObject = (snap: QuerySnapshot) => {
    let codedLetters: any = {};
    snap.forEach((doc: any) => (codedLetters[doc.id.toUpperCase()] = doc.data().code));
    return codedLetters;
};

export const textToSVG = async (text: string): Promise<any> => {
    try {
        const res = await fetch(TEXT_TO_SVG_URL, {
            method: 'POST',
            body: JSON.stringify({ text: text }),
        });
        if (res) {
            const text = res.text();
            console.log(typeof text);
            console.log(JSON.stringify(text));
            return text;
        } else {
            const err = `Error getting SVG from server`;
            console.error(err);
            return err;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const hersheysSVG = async (text: string): Promise<any> => {
    try {
        const res = await fetch(HERSHEYS_URL, {
            method: 'POST',
            body: JSON.stringify({ text: text }),
        });
        if (res) {
            const text = res.text();
            console.log(typeof text);
            console.log(JSON.stringify(text));
            return text;
        } else {
            const err = `Error getting SVG from server`;
            console.error(err);
            return err;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const generateGCode = async (text: string) => {
    const textToGenerate = text.toUpperCase();
    let Gcode = '';
    let codedLetters: any = {};
    await getDocs(LETTERS_REF).then((snap) => (codedLetters = mapLettersToObject(snap)));

    for (let index = 0; index < textToGenerate.length; index++) {
        const char = textToGenerate.charAt(index);
        Gcode += codedLetters[char];
    }

    return Gcode;
};

export const saveNewGCode = (letter: string, newgcode: string) =>
    setDoc(doc(getFirestore(), `letters/${letter}`), { code: newgcode });

export const getAllLetters = (onUpdate: (value: any) => void) =>
    onSnapshot(query(LETTERS_REF), (snap) => onUpdate(mapLettersToObject(snap)), console.error);
