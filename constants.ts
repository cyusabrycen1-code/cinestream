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

export const TRENDING_MOVIES: Movie[] = [
  {
    id: 't1',
    title: 'The Last Horizon',
    synopsis: 'As the sun begins to die, a team of astronauts embarks on a perilious journey to find a new home for humanity.',
    rating: 8.9,
    year: 2024,
    genres: ['Sci-Fi', 'Adventure'],
    imageUrl: 'https://picsum.photos/seed/horizon/400/600',
    backdropUrl: 'https://picsum.photos/seed/horizon_wide/1280/720',
    cast: ['Matthew M.', 'Jessica C.'],
    director: 'Christopher N.',
    duration: '2h 49m',
    matchScore: 99
  },
  {
    id: 't2',
    title: 'Shadow Protocol',
    synopsis: 'A spy is disavowed after uncovering a mole within the agency, leading to a global chase across three continents.',
    rating: 8.4,
    year: 2023,
    genres: ['Action', 'Thriller'],
    imageUrl: 'https://picsum.photos/seed/shadow/400/600',
    backdropUrl: 'https://picsum.photos/seed/shadow_wide/1280/720',
    cast: ['Tom C.', 'Rebecca F.'],
    director: 'Christopher M.',
    duration: '2h 10m',
    matchScore: 95
  },
  {
    id: 't3',
    title: 'Velvet Gold',
    synopsis: 'The rise and fall of a 1970s rock band as they navigate fame, drugs, and the pressure to create their masterpiece.',
    rating: 8.1,
    year: 2024,
    genres: ['Drama', 'Music'],
    imageUrl: 'https://picsum.photos/seed/velvet/400/600',
    backdropUrl: 'https://picsum.photos/seed/velvet_wide/1280/720',
    cast: ['Harry S.', 'Florence P.'],
    director: 'Baz L.',
    duration: '2h 20m',
    matchScore: 88
  },
  {
    id: 't4',
    title: 'Cyber Streets',
    synopsis: 'In a neon-soaked metropolis, a detective must team up with a rogue android to solve a series of impossible murders.',
    rating: 7.8,
    year: 2023,
    genres: ['Sci-Fi', 'Action'],
    imageUrl: 'https://picsum.photos/seed/cyber/400/600',
    backdropUrl: 'https://picsum.photos/seed/cyber_wide/1280/720',
    cast: ['Ryan G.', 'Ana D.'],
    director: 'Denis V.',
    duration: '2h 05m',
    matchScore: 92
  },
  {
    id: 't5',
    title: 'The Chef\'s Table',
    synopsis: 'A psychological thriller set in a high-stakes kitchen where perfection is expected and failure is not an option.',
    rating: 8.5,
    year: 2022,
    genres: ['Thriller', 'Drama'],
    imageUrl: 'https://picsum.photos/seed/chef/400/600',
    backdropUrl: 'https://picsum.photos/seed/chef_wide/1280/720',
    cast: ['Ralph F.', 'Anya T.'],
    director: 'Mark M.',
    duration: '1h 47m',
    matchScore: 85
  }
];

export const ACTION_MOVIES: Movie[] = [
  {
    id: 'a1',
    title: 'Redline Fury',
    synopsis: 'A former getaway driver is pulled back into the life for one last job that puts his family at risk.',
    rating: 7.5,
    year: 2023,
    genres: ['Action', 'Crime'],
    imageUrl: 'https://picsum.photos/seed/redline/400/600',
    backdropUrl: 'https://picsum.photos/seed/redline_wide/1280/720',
    cast: ['Vin D.', 'Jason S.'],
    director: 'Justin L.',
    duration: '2h 15m',
    matchScore: 94
  },
  {
    id: 'a2',
    title: 'Extraction Point',
    synopsis: 'A mercenary is hired to rescue a kidnapped scientist from a warlord\'s fortress in the jungle.',
    rating: 7.9,
    year: 2024,
    genres: ['Action', 'War'],
    imageUrl: 'https://picsum.photos/seed/extract/400/600',
    backdropUrl: 'https://picsum.photos/seed/extract_wide/1280/720',
    cast: ['Chris H.', 'David H.'],
    director: 'Sam H.',
    duration: '1h 58m',
    matchScore: 91
  },
  {
    id: 'a3',
    title: 'Bullet Train 2',
    synopsis: 'More assassins, faster train, bigger explosions. The chaos continues on the rails.',
    rating: 7.7,
    year: 2024,
    genres: ['Action', 'Comedy'],
    imageUrl: 'https://picsum.photos/seed/bullet/400/600',
    backdropUrl: 'https://picsum.photos/seed/bullet_wide/1280/720',
    cast: ['Brad P.', 'Aaron T.'],
    director: 'David L.',
    duration: '2h 05m',
    matchScore: 89
  },
  {
    id: 'a4',
    title: 'The Guard',
    synopsis: 'An immortal warrior fights to protect a secret that could destroy the world.',
    rating: 7.2,
    year: 2022,
    genres: ['Action', 'Fantasy'],
    imageUrl: 'https://picsum.photos/seed/guard/400/600',
    backdropUrl: 'https://picsum.photos/seed/guard_wide/1280/720',
    cast: ['Charlize T.', 'Kiki L.'],
    director: 'Gina P.',
    duration: '2h 00m',
    matchScore: 86
  },
  {
    id: 'a5',
    title: 'Skyfall Down',
    synopsis: 'A special agent must protect the skies from a terrorist organization using drones.',
    rating: 8.0,
    year: 2023,
    genres: ['Action', 'Thriller'],
    imageUrl: 'https://picsum.photos/seed/skyfall/400/600',
    backdropUrl: 'https://picsum.photos/seed/skyfall_wide/1280/720',
    cast: ['Daniel C.', 'Naomie H.'],
    director: 'Cary F.',
    duration: '2h 25m',
    matchScore: 93
  }
];

export const SCIFI_MOVIES: Movie[] = [
  {
    id: 's1',
    title: 'Stellar Drift',
    synopsis: 'Lost in the void between galaxies, a crew faces the psychological toll of infinite isolation.',
    rating: 8.6,
    year: 2024,
    genres: ['Sci-Fi', 'Psychological'],
    imageUrl: 'https://picsum.photos/seed/stellar/400/600',
    backdropUrl: 'https://picsum.photos/seed/stellar_wide/1280/720',
    cast: ['Cillian M.', 'Emily B.'],
    director: 'Christopher N.',
    duration: '2h 30m',
    matchScore: 97
  },
  {
    id: 's2',
    title: 'Android Dreams',
    synopsis: 'Do androids dream? One detective finds out the hard way when he falls in love with a suspect.',
    rating: 8.2,
    year: 2022,
    genres: ['Sci-Fi', 'Romance'],
    imageUrl: 'https://picsum.photos/seed/android/400/600',
    backdropUrl: 'https://picsum.photos/seed/android_wide/1280/720',
    cast: ['Joaquin P.', 'Scarlett J.'],
    director: 'Spike J.',
    duration: '2h 06m',
    matchScore: 90
  },
  {
    id: 's3',
    title: 'Mars Colony 1',
    synopsis: 'The first generation born on Mars begins to question the authority of Earth.',
    rating: 7.9,
    year: 2023,
    genres: ['Sci-Fi', 'Drama'],
    imageUrl: 'https://picsum.photos/seed/mars/400/600',
    backdropUrl: 'https://picsum.photos/seed/mars_wide/1280/720',
    cast: ['Timothée C.', 'Zendaya'],
    director: 'Denis V.',
    duration: '2h 15m',
    matchScore: 88
  },
  {
    id: 's4',
    title: 'Quantum Paradox',
    synopsis: 'A scientist invents a machine that can send messages to the past, changing the present in horrific ways.',
    rating: 8.4,
    year: 2024,
    genres: ['Sci-Fi', 'Thriller'],
    imageUrl: 'https://picsum.photos/seed/quantum/400/600',
    backdropUrl: 'https://picsum.photos/seed/quantum_wide/1280/720',
    cast: ['John D.', 'Elizabeth O.'],
    director: 'Alex G.',
    duration: '1h 55m',
    matchScore: 92
  },
  {
    id: 's5',
    title: 'The Artifact',
    synopsis: 'An alien object lands in the ocean. The world holds its breath as it opens.',
    rating: 8.0,
    year: 2023,
    genres: ['Sci-Fi', 'Mystery'],
    imageUrl: 'https://picsum.photos/seed/artifact/400/600',
    backdropUrl: 'https://picsum.photos/seed/artifact_wide/1280/720',
    cast: ['Amy A.', 'Jeremy R.'],
    director: 'Denis V.',
    duration: '2h 00m',
    matchScore: 85
  }
];

export const DRAMA_MOVIES: Movie[] = [
  {
    id: 'd1',
    title: 'The Silent Note',
    synopsis: 'A deaf pianist struggles to complete her symphony before she loses her hearing completely.',
    rating: 9.0,
    year: 2023,
    genres: ['Drama', 'Music'],
    imageUrl: 'https://picsum.photos/seed/note/400/600',
    backdropUrl: 'https://picsum.photos/seed/note_wide/1280/720',
    cast: ['Cate B.', 'Nina H.'],
    director: 'Todd F.',
    duration: '2h 38m',
    matchScore: 96
  },
  {
    id: 'd2',
    title: 'Empire of Dust',
    synopsis: 'A family saga set during the Great Depression, following three brothers who take different paths.',
    rating: 8.7,
    year: 2022,
    genres: ['Drama', 'History'],
    imageUrl: 'https://picsum.photos/seed/dust/400/600',
    backdropUrl: 'https://picsum.photos/seed/dust_wide/1280/720',
    cast: ['Leonardo D.', 'Robert D.'],
    director: 'Martin S.',
    duration: '3h 10m',
    matchScore: 94
  },
  {
    id: 'd3',
    title: 'Broken Glass',
    synopsis: 'A marriage falls apart in slow motion after a sudden tragedy strikes a suburban couple.',
    rating: 8.3,
    year: 2024,
    genres: ['Drama', 'Romance'],
    imageUrl: 'https://picsum.photos/seed/glass/400/600',
    backdropUrl: 'https://picsum.photos/seed/glass_wide/1280/720',
    cast: ['Adam D.', 'Scarlett J.'],
    director: 'Noah B.',
    duration: '2h 15m',
    matchScore: 89
  },
  {
    id: 'd4',
    title: 'The Teacher',
    synopsis: 'An inner-city teacher inspires a group of at-risk youth to compete in a national robotics championship.',
    rating: 7.9,
    year: 2023,
    genres: ['Drama', 'Inspirational'],
    imageUrl: 'https://picsum.photos/seed/teacher/400/600',
    backdropUrl: 'https://picsum.photos/seed/teacher_wide/1280/720',
    cast: ['Michael B.', 'Viola D.'],
    director: 'Ryan C.',
    duration: '2h 05m',
    matchScore: 87
  },
  {
    id: 'd5',
    title: 'Courtroom 7',
    synopsis: 'A rookie lawyer takes on a corporate giant in a case that could change environmental law forever.',
    rating: 8.1,
    year: 2024,
    genres: ['Drama', 'Legal'],
    imageUrl: 'https://picsum.photos/seed/court/400/600',
    backdropUrl: 'https://picsum.photos/seed/court_wide/1280/720',
    cast: ['Mark R.', 'Anne H.'],
    director: 'Todd H.',
    duration: '2h 08m',
    matchScore: 85
  }
];

export const COMEDY_MOVIES: Movie[] = [
  {
    id: 'c1',
    title: 'The Big Misunderstanding',
    synopsis: 'Two strangers accidentally swap phones at the airport and end up living each other\'s chaotic lives for a week.',
    rating: 7.8,
    year: 2024,
    genres: ['Comedy', 'Romance'],
    imageUrl: 'https://picsum.photos/seed/misunder/400/600',
    backdropUrl: 'https://picsum.photos/seed/misunder_wide/1280/720',
    cast: ['Kevin H.', 'Awkwafina'],
    director: 'Paul F.',
    duration: '1h 45m',
    matchScore: 92
  },
  {
    id: 'c2',
    title: 'Office Space 2099',
    synopsis: 'Even in the future, the printer still doesn\'t work. A satire on corporate culture on a space station.',
    rating: 8.2,
    year: 2023,
    genres: ['Comedy', 'Sci-Fi'],
    imageUrl: 'https://picsum.photos/seed/office/400/600',
    backdropUrl: 'https://picsum.photos/seed/office_wide/1280/720',
    cast: ['Steve C.', 'Bill H.'],
    director: 'Armando I.',
    duration: '1h 55m',
    matchScore: 88
  },
  {
    id: 'c3',
    title: 'Wedding Crashers: The Reunion',
    synopsis: 'They are back, older but definitely not wiser, crashing the biggest wedding of the decade.',
    rating: 7.5,
    year: 2024,
    genres: ['Comedy'],
    imageUrl: 'https://picsum.photos/seed/wedding/400/600',
    backdropUrl: 'https://picsum.photos/seed/wedding_wide/1280/720',
    cast: ['Owen W.', 'Vince V.'],
    director: 'David D.',
    duration: '2h 02m',
    matchScore: 85
  },
  {
    id: 'c4',
    title: 'Game Night Gone Wrong',
    synopsis: 'A friendly neighborhood game night turns into a real-life mystery when the host actually disappears.',
    rating: 7.9,
    year: 2022,
    genres: ['Comedy', 'Mystery'],
    imageUrl: 'https://picsum.photos/seed/gamenight/400/600',
    backdropUrl: 'https://picsum.photos/seed/gamenight_wide/1280/720',
    cast: ['Jason B.', 'Rachel M.'],
    director: 'John F.',
    duration: '1h 50m',
    matchScore: 90
  },
  {
    id: 'c5',
    title: 'Super Dad',
    synopsis: 'A scientist accidentally gives himself superpowers but has to hide them from his teenage kids.',
    rating: 7.0,
    year: 2023,
    genres: ['Comedy', 'Family'],
    imageUrl: 'https://picsum.photos/seed/superdad/400/600',
    backdropUrl: 'https://picsum.photos/seed/superdad_wide/1280/720',
    cast: ['Will F.', 'Tina F.'],
    director: 'Adam M.',
    duration: '1h 38m',
    matchScore: 82
  }
];

export const HORROR_MOVIES: Movie[] = [
  {
    id: 'h1',
    title: 'Whispers in the Walls',
    synopsis: 'A family moves into a renovated victorian home, only to realize the renovations didn\'t cover up the past.',
    rating: 8.1,
    year: 2024,
    genres: ['Horror', 'Thriller'],
    imageUrl: 'https://picsum.photos/seed/whispers/400/600',
    backdropUrl: 'https://picsum.photos/seed/whispers_wide/1280/720',
    cast: ['Vera F.', 'Patrick W.'],
    director: 'James W.',
    duration: '2h 12m',
    matchScore: 91
  },
  {
    id: 'h2',
    title: 'The Loop',
    synopsis: 'A group of friends gets stuck in a time loop inside a haunted carnival.',
    rating: 7.6,
    year: 2023,
    genres: ['Horror', 'Sci-Fi'],
    imageUrl: 'https://picsum.photos/seed/loop/400/600',
    backdropUrl: 'https://picsum.photos/seed/loop_wide/1280/720',
    cast: ['Jenna O.', 'Finn W.'],
    director: 'Jordan P.',
    duration: '1h 45m',
    matchScore: 87
  },
  {
    id: 'h3',
    title: 'Deep Water',
    synopsis: 'Divers exploring a cave system encounter a species that has evolved in total darkness.',
    rating: 7.4,
    year: 2022,
    genres: ['Horror', 'Adventure'],
    imageUrl: 'https://picsum.photos/seed/deepwater/400/600',
    backdropUrl: 'https://picsum.photos/seed/deepwater_wide/1280/720',
    cast: ['Kristen S.', 'Vincent C.'],
    director: 'William E.',
    duration: '1h 55m',
    matchScore: 84
  },
  {
    id: 'h4',
    title: 'Night Shift',
    synopsis: 'A security guard at a wax museum starts to suspect the exhibits are moving when he looks away.',
    rating: 6.9,
    year: 2024,
    genres: ['Horror'],
    imageUrl: 'https://picsum.photos/seed/wax/400/600',
    backdropUrl: 'https://picsum.photos/seed/wax_wide/1280/720',
    cast: ['Evan P.', 'Sarah P.'],
    director: 'David S.',
    duration: '1h 30m',
    matchScore: 78
  },
  {
    id: 'h5',
    title: 'Viral',
    synopsis: 'A cursed social media trend causes hallucinations in anyone who watches the video.',
    rating: 7.2,
    year: 2023,
    genres: ['Horror', 'Mystery'],
    imageUrl: 'https://picsum.photos/seed/viral/400/600',
    backdropUrl: 'https://picsum.photos/seed/viral_wide/1280/720',
    cast: ['Mia G.', 'Alex W.'],
    director: 'Ti W.',
    duration: '1h 42m',
    matchScore: 80
  }
];

export const ANIMATION_MOVIES: Movie[] = [
  {
    id: 'an1',
    title: 'Sky Sailors',
    synopsis: 'In a world of floating islands, a young pilot dreams of reaching the surface of the planet below.',
    rating: 8.8,
    year: 2024,
    genres: ['Animation', 'Adventure'],
    imageUrl: 'https://picsum.photos/seed/skysail/400/600',
    backdropUrl: 'https://picsum.photos/seed/skysail_wide/1280/720',
    cast: ['Tom H.', 'Zendaya'],
    director: 'Hayao M.',
    duration: '1h 55m',
    matchScore: 96
  },
  {
    id: 'an2',
    title: 'The Clockwork City',
    synopsis: 'A robot with a heart of gold tries to save his mechanical city from rusting away.',
    rating: 8.5,
    year: 2023,
    genres: ['Animation', 'Family'],
    imageUrl: 'https://picsum.photos/seed/clockwork/400/600',
    backdropUrl: 'https://picsum.photos/seed/clockwork_wide/1280/720',
    cast: ['Chris P.', 'Anya T.'],
    director: 'Brad B.',
    duration: '1h 40m',
    matchScore: 93
  },
  {
    id: 'an3',
    title: 'Spirit of the Forest',
    synopsis: 'A girl gets lost in an ancient forest and must help the spirits protect their home from loggers.',
    rating: 8.3,
    year: 2022,
    genres: ['Animation', 'Fantasy'],
    imageUrl: 'https://picsum.photos/seed/spirit/400/600',
    backdropUrl: 'https://picsum.photos/seed/spirit_wide/1280/720',
    cast: ['Saoirse R.', 'Dev P.'],
    director: 'Tomm M.',
    duration: '1h 48m',
    matchScore: 90
  },
  {
    id: 'an4',
    title: 'Cyber Ninja',
    synopsis: 'A futuristic ninja fights to take down a corrupt mega-corporation in Neo-Tokyo.',
    rating: 8.0,
    year: 2024,
    genres: ['Animation', 'Action'],
    imageUrl: 'https://picsum.photos/seed/ninja/400/600',
    backdropUrl: 'https://picsum.photos/seed/ninja_wide/1280/720',
    cast: ['Simu L.', 'Karen F.'],
    director: 'Genndy T.',
    duration: '1h 35m',
    matchScore: 88
  },
  {
    id: 'an5',
    title: 'Barnyard Beats',
    synopsis: 'Farm animals start a rock band to save their farm from foreclosure.',
    rating: 7.5,
    year: 2023,
    genres: ['Animation', 'Comedy'],
    imageUrl: 'https://picsum.photos/seed/barn/400/600',
    backdropUrl: 'https://picsum.photos/seed/barn_wide/1280/720',
    cast: ['Jack B.', 'Seth R.'],
    director: 'Garth J.',
    duration: '1h 30m',
    matchScore: 85
  }
];

// Fallback is now a mix of everything
export const FALLBACK_MOVIES: Movie[] = [
    ...TRENDING_MOVIES,
    ...ACTION_MOVIES,
    ...SCIFI_MOVIES,
    ...DRAMA_MOVIES,
    ...COMEDY_MOVIES,
    ...HORROR_MOVIES,
    ...ANIMATION_MOVIES
];