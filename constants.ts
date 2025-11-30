import { Movie, UserProfile } from './types';

export const USER_PROFILE: UserProfile = {
  id: 'u1',
  name: 'Alex',
  avatarUrl: 'https://picsum.photos/seed/user_alex/200/200'
};

export const INITIAL_FEATURED_MOVIE: Movie = {
  id: 'feat-1',
  title: 'Eclipse of the Mind',
  synopsis: 'In a future where memories can be traded as currency, a rogue archivist discovers a conspiracy that threatens to erase humanity’s collective history. A visual masterpiece of neon and shadow.',
  rating: 9.2,
  year: 2024,
  genres: ['Sci-Fi', 'Thriller', 'Cyberpunk'],
  imageUrl: 'https://picsum.photos/seed/eclipse/600/900',
  backdropUrl: 'https://picsum.photos/seed/eclipse_wide/1920/1080',
  cast: ['Elena Vance', 'Kaelen Thorne', 'Mila Jov'],
  director: 'Ridley N.',
  duration: '2h 14m',
  matchScore: 98
};

// Fallback data if API fails or for initial render
export const FALLBACK_MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Neon Nights',
    synopsis: 'A street racer with nothing to lose enters the most dangerous tournament in the underground circuit.',
    rating: 8.5,
    year: 2023,
    genres: ['Action', 'Crime'],
    imageUrl: 'https://picsum.photos/seed/neon/400/600',
    backdropUrl: 'https://picsum.photos/seed/neon_wide/1280/720',
    cast: ['Vin D.', 'Paul W.'],
    director: 'Justin L.',
    duration: '1h 58m',
    matchScore: 95
  },
  {
    id: 'm2',
    title: 'The Silent Sea',
    synopsis: 'A research team stranded on an oceanic planet must survive the depths and what lies beneath.',
    rating: 7.9,
    year: 2022,
    genres: ['Sci-Fi', 'Horror'],
    imageUrl: 'https://picsum.photos/seed/sea/400/600',
    backdropUrl: 'https://picsum.photos/seed/sea_wide/1280/720',
    cast: ['Sarah P.', 'John K.'],
    director: 'James C.',
    duration: '2h 05m',
    matchScore: 88
  },
  {
    id: 'm3',
    title: 'Velocity',
    synopsis: 'A high-stakes heist movie set on a moving bullet train that never stops.',
    rating: 8.1,
    year: 2024,
    genres: ['Action', 'Thriller'],
    imageUrl: 'https://picsum.photos/seed/velocity/400/600',
    backdropUrl: 'https://picsum.photos/seed/velocity_wide/1280/720',
    cast: ['Brad P.', 'Sandra B.'],
    director: 'David L.',
    duration: '1h 50m',
    matchScore: 92
  },
  {
    id: 'm4',
    title: 'Forgotten Realms',
    synopsis: 'An epic fantasy adventure through a world where magic is dying and dragons are myths.',
    rating: 8.8,
    year: 2023,
    genres: ['Fantasy', 'Adventure'],
    imageUrl: 'https://picsum.photos/seed/fantasy/400/600',
    backdropUrl: 'https://picsum.photos/seed/fantasy_wide/1280/720',
    cast: ['Ian M.', 'Elijah W.'],
    director: 'Peter J.',
    duration: '2h 45m',
    matchScore: 85
  },
  {
    id: 'm5',
    title: 'Code Red',
    synopsis: 'A rogue AI takes over a military bunker. One hacker has to break in to shut it down.',
    rating: 7.5,
    year: 2024,
    genres: ['Thriller', 'Tech'],
    imageUrl: 'https://picsum.photos/seed/codered/400/600',
    backdropUrl: 'https://picsum.photos/seed/codered_wide/1280/720',
    cast: ['Rami M.', 'Christian S.'],
    director: 'Sam E.',
    duration: '1h 40m',
    matchScore: 78
  }
];
