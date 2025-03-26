"use server";

import { GoogleGenAI } from "@google/genai";

export const generateResponse = async (prompt: string) => {
	const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

	const result = await ai.models.generateContent({
		model: process.env.GEMINI_MODEL as string,
		contents: prompt,
	});
	return result.text;
};
