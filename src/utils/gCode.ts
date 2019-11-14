import firebaseApp from '../config/firebase';

export const generateGCode = (text: string) => `This is G Code: ${text}`;

export const saveNewGCode = (letter: string, newgcode: string) =>
    firebaseApp
        .firestore()
        .collection('letters')
        .doc(letter)
        .set({ code: newgcode });

export const getAllLetters = (onUpdate: (value: any) => void) =>
    firebaseApp
        .firestore()
        .collection('letters')
        .onSnapshot(snap => {
            let codedLetters: any = {};
            snap.forEach(doc => (codedLetters[doc.id.toUpperCase()] = doc.data().code));
            onUpdate(codedLetters);
        }, console.error);
