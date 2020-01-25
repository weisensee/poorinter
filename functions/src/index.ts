import * as functions from 'firebase-functions';
const cors = require('cors');
const express = require('express');
const TextToSVG = require('text-to-svg');
const hersheyText = require('hersheytext');
const DEFAULT_FONT = require('path').join(__dirname, '/fonts/SkarpaLt.ttf');

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// const whitelist = ['http://localhost:3000/', 'http://localhost:5000/'];
// const corsOptions = {
//     origin: function(
//         origin: string,
//         callback: { (arg0: null, arg1: boolean): void; (arg0: Error): void }
//     ) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// };

const app = express();
app.use(cors({ origin: true }));

const getSVG = (request: { body: string }, response: { send: (arg0: any) => void }) => {
	const body = JSON.parse(request.body);

	const textToSVG = TextToSVG.loadSync(DEFAULT_FONT);

	const attributes = { fill: 'black', stroke: 'black' };
	const options = { x: 0, y: 0, fontSize: 72, anchor: 'top', attributes: attributes };

	const svg = textToSVG.getSVG(body.text || 'Trump Test', options);
	console.log(svg);

	response.send(svg);
};

// const  svgToGcode = ()=>{
//     async function ls() {
//         const { stdout, stderr } = await exec('ls');
//         console.log('stdout:', stdout);
//         console.log('stderr:', stderr);
//     }
//     ls();
// }

const hersheySVG = (request: { body: string }, response: { send: (arg0: any) => void }) => {
	const body = JSON.parse(request.body);

	const svg = hersheyText.renderTextSVG(body.text, {
		id: 'mytext',
		font: 'futural',
		charWidth: 10,
		pos: { x: 50, y: 50 }
	});
	console.log(svg);

	response.send(svg);
};

app.post('/textToSVG', getSVG);
app.post('/hersheySVG', hersheySVG);
exports.app = functions.https.onRequest(app);
