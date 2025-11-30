import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Movie } from '../types';

// Initialize Gemini safely using process.env.API_KEY directly
let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI client:", e);
  }
}

export const fetchMoviesAI = async (categoryOrQuery: string): Promise<Movie[]> => {
  if (!ai) {
    console.warn("Gemini API Key missing or client not initialized, returning fallback data.");
    return [] as Movie[];
  }

  try {
    const prompt = `
      Generate a list of 6 distinct, fictional or real movies that fit the category or search query: "${categoryOrQuery}".
      Focus on high-quality, cinematic titles. 
      For 'imageUrl' and 'backdropUrl', assume I will use a placeholder service, so just return empty strings or generic descriptors, I will handle the URLs in the frontend code.
      Make the data look realistic.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
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
    
    if (json.movies && Array.isArray(json.movies)) {
      // Hydrate with placeholder images since AI returns text/empty for urls
      const movies: Movie[] = json.movies.map((m: any, index: number): Movie => ({
        id: m.id || `gen-${Math.random()}`,
        title: m.title || "Untitled",
        synopsis: m.synopsis || "No description available.",
        rating: typeof m.rating === 'number' ? m.rating : 5.0,
        year: typeof m.year === 'number' ? m.year : 2024,
        genres: Array.isArray(m.genres) ? m.genres : ["Unknown"],
        imageUrl: `https://picsum.photos/seed/${(m.title || "t").replace(/\s/g, '') + index}/400/600`,
        backdropUrl: `https://picsum.photos/seed/${(m.title || "t").replace(/\s/g, '') + index}_wide/1280/720`,
        cast: Array.isArray(m.cast) ? m.cast : [],
        director: m.director || "Unknown",
        duration: m.duration || "2h 0m",
        matchScore: typeof m.matchScore === 'number' ? m.matchScore : 85,
        videoUrl: undefined
      }));
      return movies;
    }
    return [] as Movie[];

  } catch (error) {
    console.error("Gemini fetch failed:", error);
    return [] as Movie[];
  }
};