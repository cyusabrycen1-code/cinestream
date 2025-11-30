export interface Movie {
  id: string;
  title: string;
  synopsis: string;
  rating: number; // 0-10 scale
  year: number;
  genres: string[];
  imageUrl: string; // Poster
  backdropUrl: string; // Wide image for hero/details
  cast: string[];
  director: string;
  duration: string;
  matchScore?: number; // Simulated "Match for you" %
  videoUrl?: string; // Blob URL for uploaded videos
}

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
}

export type ViewState = 'home' | 'search' | 'favorites' | 'movies' | 'series';