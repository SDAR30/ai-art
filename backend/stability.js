//Stability.ai REST API Documentation: https://stability.ai/docs/api/generation/text-to-image
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv')

dotenv.config()

const engineId = 'stable-diffusion-512-v2-0';
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const url = `${apiHost}/v1alpha/generation/${engineId}/text-to-image`
const filename = 'stability_image.png';
const outputFile = `${process.env.OUT_DIR ?? "."}/${filename}`

const apiKey = process.env.STABILITY_API_KEY
if (!apiKey) throw new Error("Missing Stability API key.");

const generateStableImage = async (prompt = 'apple') => {
	console.log('inside generateStableImage', prompt);

	const response = await fetch(
		url,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'image/png',
				Authorization: apiKey,
			},
			body: JSON.stringify({
				cfg_scale: 7,
				clip_guidance_preset: 'FAST_BLUE',
				height: 512,
				width: 512,
				samples: 1,
				steps: 50,
				text_prompts: [
					{
						text: prompt,
						weight: 1
					}
				],
			})
		}
	);

	if (!response.ok) {
		throw new Error(`Non-200 response: ${await response.text()}`);
	}

	try {
		const writeStream = fs.createWriteStream(outputFile);
		console.log('writing to file', outputFile)
		response.body?.pipe(writeStream);

		await new Promise((resolve, reject) => {
			console.log('inside Promise, adding listeners')
			writeStream.on('finish', resolve);
			writeStream.on('error', reject);
		});
		const filePath = path.join(__dirname, filename);
		const data = await fs.promises.readFile(filePath);
		console.log('promise resolved, returning data')
		return data;

	} catch (e) {
		console.error(e);
		return e;
	}

}

module.exports = { generateStableImage };