import type { NextApiRequest, NextApiHandler, NextApiResponse } from "next"
import { OpenAI } from "openai"


const query = 'nature';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {

        const { prompt } = req.body;

        try {
            const url = `https://api.pexels.com/v1/search?query=${prompt}`;

            const response = await fetch(url, {
                headers: {
                    Authorization: API_KEY
                }
            })
                .then(response => response.json());

            res.status(200).json({
                images: response.photos
            });
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}