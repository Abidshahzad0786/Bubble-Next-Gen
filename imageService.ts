
import { GoogleGenAI } from "@google/genai";
import { STYLE_LOCK_SUFFIX } from "./constants";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateArtAsset = async (
  prompt: string, 
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
  retries = 3
): Promise<string | undefined> => {
  let attempt = 0;
  
  while (attempt <= retries) {
    // Create fresh instance to ensure latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const fullPrompt = `${prompt} ${STYLE_LOCK_SUFFIX}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: fullPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
          },
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      
      // If we got a response but no image part
      throw new Error("No image data returned from model");

    } catch (error: any) {
      attempt++;
      const isRateLimit = error?.message?.includes("429") || error?.status === "RESOURCE_EXHAUSTED";
      const isServerError = error?.message?.includes("500") || error?.message?.includes("Rpc failed");
      
      if ((isRateLimit || isServerError) && attempt <= retries) {
        // Exponential backoff: 2s, 4s, 8s...
        const delay = Math.pow(2, attempt) * 1000;
        console.warn(`Attempt ${attempt} failed (${error.message}). Retrying in ${delay}ms...`);
        await sleep(delay);
        continue;
      }
      
      console.error("Image generation final failure:", error);
      throw error;
    }
  }
  return undefined;
};
