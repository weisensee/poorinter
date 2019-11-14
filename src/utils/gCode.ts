import firebaseApp from '../config/firebase';

export const generateGCode = (text: string) => `This is G Code: ${text}`;

export const saveNewGCode = (letter: string, newgcode: string) =>
    firebaseApp
        .firestore()
        .collection('letters')
        .doc(letter)
        .set({ code: newgcode });
