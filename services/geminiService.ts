import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from '../types';

const API_KEY = process.env.API_KEY;

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const fetchMoviesAI = async (categoryOrQuery: string): Promise<Movie[]> => {
  if (!ai) {
    console.warn("Gemini API Key missing, returning fallback data.");
    return [];
  }

  try {
    const prompt = `
      Generate a list of 6 distinct, fictional or real movies that fit the category or search query: "${categoryOrQuery}".
      Focus on high-quality, cinematic titles. 
      For 'imageUrl' and 'backdropUrl', assume I will use a placeholder service, so just return empty strings or generic descriptors, I will handle the URLs in the frontend code.
      Make the data look realistic.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            movies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  synopsis: { type: Type.STRING },
                  rating: { type: Type.NUMBER },
                  year: { type: Type.INTEGER },
                  genres: { type: Type.ARRAY, items: { type: Type.STRING } },
                  cast: { type: Type.ARRAY, items: { type: Type.STRING } },
                  director: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  matchScore: { type: Type.INTEGER },
                },
                required: ["id", "title", "synopsis", "rating", "year", "genres", "cast", "director", "duration"]
              }
            }
          }
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    
    if (json.movies) {
      // Hydrate with placeholder images since AI returns text/empty for urls
      return json.movies.map((m: any, index: number) => ({
        ...m,
        id: m.id || `gen-${Math.random()}`,
        imageUrl: `https://picsum.photos/seed/${m.title.replace(/\s/g, '') + index}/400/600`,
        backdropUrl: `https://picsum.photos/seed/${m.title.replace(/\s/g, '') + index}_wide/1280/720`,
        matchScore: m.matchScore || Math.floor(Math.random() * 20) + 80
      }));
    }
    return [];

  } catch (error) {
    console.error("Gemini fetch failed:", error);
    return [];
  }
};
