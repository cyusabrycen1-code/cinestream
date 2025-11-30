import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MovieRow } from './components/MovieRow';
import { MovieDetails } from './components/MovieDetails';
import { UploadModal } from './components/UploadModal';
import { VideoPlayer } from './components/VideoPlayer';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminAuthModal } from './components/AdminAuthModal';
import { Movie, ViewState } from './types';
import { 
  INITIAL_FEATURED_MOVIE, 
  FALLBACK_MOVIES, 
  TRENDING_MOVIES, 
  ACTION_MOVIES, 
  SCIFI_MOVIES, 
  DRAMA_MOVIES,
  COMEDY_MOVIES,
  HORROR_MOVIES,
  ANIMATION_MOVIES
} from './constants';
import { fetchMoviesAI } from './services/geminiService';
import { Loader2 } from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: 'uploads', title: 'My Uploads' },
  { id: 'trending', title: 'Trending Now' },
  { id: 'action', title: 'Adrenaline Rush' },
  { id: 'scifi', title: 'Futuristic Worlds' },
  { id: 'animation', title: 'Animation & Fantasy' },
  { id: 'comedy', title: 'Laugh Out Loud' },
  { id: 'horror', title: 'Chills & Thrills' },
  { id: 'drama', title: 'Critically Acclaimed' }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // Data State
  const [categoryMovies, setCategoryMovies] = useState<Record<string, Movie[]>>({
    'trending': TRENDING_MOVIES,
    'action': ACTION_MOVIES,
    'scifi': SCIFI_MOVIES,
    'drama': DRAMA_MOVIES,
    'comedy': COMEDY_MOVIES,
    'horror': HORROR_MOVIES,
    'animation': ANIMATION_MOVIES,
    'uploads': []
  });
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Upload & Video State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);
  const [playingVideoTitle, setPlayingVideoTitle] = useState<string>('');

  // Admin State
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Load Persisted User Added Movies on Mount
  useEffect(() => {
      const storedMovies = localStorage.getItem('cinestream_custom_movies');
      if (storedMovies) {
          try {
              const customMovies: { movie: Movie, categoryId: string }[] = JSON.parse(storedMovies);
              setCategoryMovies(prev => {
                  const newState = { ...prev };
                  customMovies.forEach(item => {
                      if (newState[item.categoryId]) {
                          // Prevent duplicates if local storage has dupes
                          if (!newState[item.categoryId].some(m => m.id === item.movie.id)) {
                             newState[item.categoryId] = [item.movie, ...newState[item.categoryId]];
                          }
                      }
                  });
                  return newState;
              });
          } catch (e) {
              console.error("Failed to parse local movies", e);
          }
      }
  }, []);

  // Handlers
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AI Data Refresh
  useEffect(() => {
    const loadData = async () => {
      try {
          const newTrending: Movie[] = await fetchMoviesAI('Top Trending Movies 2025');
          if (newTrending && newTrending.length > 0) {
             setCategoryMovies(prev => ({ 
                 ...prev, 
                 'trending': [...newTrending, ...(prev['trending'] || [])] 
             }));
          }
      } catch (e) {
          console.log("Using static fallback data.");
      }
    };
    loadData();
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setCurrentView('search');
    
    const normalizedQuery = query.toLowerCase();
    
    // Safer way to flatten arrays compatible with older TS configs
    const allMovies: Movie[] = Object.values(categoryMovies).reduce((acc, movies) => [...acc, ...movies], [] as Movie[]);
    
    const localResults = allMovies.filter((movie: Movie) => 
        movie.title.toLowerCase().includes(normalizedQuery) ||
        movie.genres.some((g: string) => g.toLowerCase().includes(normalizedQuery))
    );
    
    // Fix: Explicitly type Map and Array.from to prevent 'unknown[]' inference errors
    const uniqueLocalResults: Movie[] = Array.from(
        new Map<string, Movie>(localResults.map((m) => [m.id, m])).values()
    );
    setSearchResults(uniqueLocalResults);

    try {
        const aiResults: Movie[] = await fetchMoviesAI(query);
        setSearchResults(prev => {
            const combined = [...prev];
            aiResults.forEach(aiMovie => {
                if (!combined.some(m => m.id === aiMovie.id || m.title === aiMovie.title)) {
                    combined.push(aiMovie);
                }
            });
            return combined;
        });
    } catch (e) {
        console.error("AI Search incomplete", e);
    } finally {
        setIsSearching(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handlePlayMovie = (movie?: Movie) => {
    const target = movie || selectedMovie;
    if (target?.videoUrl) {
        setPlayingVideoTitle(target.title);
        setPlayingVideoUrl(target.videoUrl);
        setSelectedMovie(null);
    } else {
        alert(`Starting playback for: ${target?.title}. (Demo Mode)`);
    }
  };

  const handleUploadMovie = (movie: Movie) => {
      setCategoryMovies(prev => ({
          ...prev,
          'uploads': [movie, ...(prev['uploads'] || [])]
      }));
  };
  
  const handleDeleteMovie = (movieId: string) => {
      if (confirm('Are you sure you want to delete this content?')) {
          setCategoryMovies(prev => {
            const newState = { ...prev };
            Object.keys(newState).forEach(key => {
                newState[key] = newState[key].filter(m => m.id !== movieId);
            });
            return newState;
          });
          setFavorites(prev => prev.filter(id => id !== movieId));
          setSelectedMovie(null);

          // Update Persistent Storage (remove from custom list)
          const stored = localStorage.getItem('cinestream_custom_movies');
          if (stored) {
              const custom = JSON.parse(stored);
              const updated = custom.filter((item: any) => item.movie.id !== movieId);
              localStorage.setItem('cinestream_custom_movies', JSON.stringify(updated));
          }
      }
  };

  // Admin Actions
  const handleAdminAddMovie = (movie: Movie, categoryId: string) => {
      setCategoryMovies(prev => ({
          ...prev,
          [categoryId]: [movie, ...(prev[categoryId] || [])]
      }));

      // Persist
      const stored = localStorage.getItem('cinestream_custom_movies');
      const custom = stored ? JSON.parse(stored) : [];
      custom.push({ movie, categoryId });
      localStorage.setItem('cinestream_custom_movies', JSON.stringify(custom));
  };

  const getFavoritesMovies = () => {
    const allMovies = [
      INITIAL_FEATURED_MOVIE,
      ...Object.values(categoryMovies).reduce((acc, movies) => [...acc, ...movies], [] as Movie[]),
      ...searchResults,
      ...FALLBACK_MOVIES
    ];
    const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());
    return uniqueMovies.filter(m => favorites.includes(m.id));
  };
  
  // Dynamic Carousel using the current trending list
  const getCarouselMovies = () => {
      const trending = categoryMovies['trending'] || [];
      const action = categoryMovies['action'] || [];
      return [
        INITIAL_FEATURED_MOVIE,
        ...(trending.slice(0, 2)),
        ...(action.slice(0, 1))
      ].filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      <Navbar 
        onSearch={handleSearch} 
        currentView={currentView} 
        onNavigate={setCurrentView}
        isScrolled={isScrolled}
        onUploadClick={() => setShowUploadModal(true)}
      />

      {/* Main Content Area */}
      <main className="pb-20">
        
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <Hero 
                movies={getCarouselMovies()} 
                onInfoClick={setSelectedMovie} 
                onPlayClick={() => handlePlayMovie(getCarouselMovies()[0])}
            />
            
            <div className="relative z-20 -mt-24 md:-mt-48 pl-0 space-y-4 bg-gradient-to-t from-black via-black to-transparent pt-12">
               {INITIAL_CATEGORIES.map(cat => {
                   // Only show uploads row if there are uploads
                   if (cat.id === 'uploads' && (!categoryMovies['uploads'] || categoryMovies['uploads'].length === 0)) return null;

                   return (
                    <MovieRow 
                        key={cat.id} 
                        title={cat.title} 
                        movies={categoryMovies[cat.id] || []} 
                        onMovieClick={setSelectedMovie}
                        isLarge={cat.id === 'trending' || cat.id === 'uploads'} 
                    />
                   );
               })}
            </div>
          </div>
        )}

        {/* SEARCH VIEW */}
        {currentView === 'search' && (
          <div className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-white">Search Results</h2>
            {isSearching && searchResults.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-red-600 w-12 h-12" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {searchResults.map(movie => (
                   <div key={movie.id} className="transform hover:scale-105 transition-transform duration-300 group">
                      <div className="relative overflow-hidden rounded-sm shadow-lg">
                          <img 
                            src={movie.imageUrl} 
                            alt={movie.title} 
                            className="w-full h-auto aspect-[2/3] object-cover border border-zinc-800 group-hover:border-red-600 cursor-pointer transition-all duration-300"
                            onClick={() => setSelectedMovie(movie)}
                          />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">View</span>
                           </div>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-300 truncate group-hover:text-white transition-colors">{movie.title}</p>
                   </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-20">
                <p className="text-xl">No results found.</p>
                <p className="text-sm">Try searching for genres like "Cyberpunk" or "90s Action".</p>
              </div>
            )}
          </div>
        )}

        {/* FAVORITES VIEW */}
        {currentView === 'favorites' && (
          <div className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-white">My List</h2>
            {favorites.length > 0 ? (
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {getFavoritesMovies().map(movie => (
                   <div key={movie.id} className="transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src={movie.imageUrl} 
                        alt={movie.title} 
                        className="rounded-sm shadow-lg cursor-pointer w-full h-auto aspect-[2/3] object-cover border border-zinc-800 hover:border-red-600"
                        onClick={() => setSelectedMovie(movie)}
                      />
                      <p className="mt-2 text-sm font-medium text-gray-300 truncate">{movie.title}</p>
                   </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-20">
                <p className="text-xl">Your list is empty.</p>
                <p className="text-sm">Add movies to your favorites to see them here.</p>
              </div>
            )}
          </div>
        )}
        
        {/* MOVIES / SERIES Placeholder Views */}
        {(currentView === 'movies' || currentView === 'series') && (
            <div className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 text-white capitalize">{currentView}</h2>
                <div className="mb-12">
                     <h3 className="text-lg font-semibold text-gray-400 mb-4">Trending in {currentView}</h3>
                     <MovieRow 
                        title=""
                        movies={currentView === 'movies' ? [...(categoryMovies['action'] || []), ...(categoryMovies['scifi'] || [])] : [...(categoryMovies['drama'] || []), ...(categoryMovies['trending'] || [])]} 
                        onMovieClick={setSelectedMovie}
                    />
                </div>
                
                 <div className="text-center text-gray-500 mt-12 flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-red-600" size={32} />
                    <p>Fetching more {currentView} for you...</p>
                 </div>
            </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-12 px-4 text-center text-gray-500 text-sm">
        <p>&copy; 2024 CineStream AI. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4 items-center">
            <span className="hover:text-red-500 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-red-500 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-red-500 transition-colors cursor-pointer">Help</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <button 
                onClick={() => setShowAdminAuth(true)} 
                className="hover:text-red-500 transition-colors cursor-pointer text-xs opacity-50 hover:opacity-100 uppercase tracking-widest font-bold focus:outline-none"
            >
                Admin Login
            </button>
        </div>
      </footer>

      {/* Upload Modal */}
      {showUploadModal && (
          <UploadModal 
            onClose={() => setShowUploadModal(false)}
            onUpload={handleUploadMovie}
          />
      )}

      {/* Video Player Overlay */}
      {playingVideoUrl && (
          <VideoPlayer 
            videoUrl={playingVideoUrl}
            title={playingVideoTitle}
            onClose={() => {
                setPlayingVideoUrl(null);
                setPlayingVideoTitle('');
            }}
          />
      )}
      
      {/* Admin Auth Modal */}
      {showAdminAuth && (
          <AdminAuthModal 
            onClose={() => setShowAdminAuth(false)}
            onSuccess={() => {
                setShowAdminAuth(false);
                setShowAdmin(true);
            }}
          />
      )}

      {/* Admin Dashboard */}
      {showAdmin && (
          <AdminDashboard 
            movies={Object.values(categoryMovies).reduce((acc, movies) => [...acc, ...movies], [] as Movie[])}
            onAddMovie={handleAdminAddMovie}
            onDeleteMovie={handleDeleteMovie}
            onClose={() => setShowAdmin(false)}
          />
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          onPlay={() => handlePlayMovie(selectedMovie)}
          isFavorite={favorites.includes(selectedMovie.id)}
          onToggleFavorite={handleToggleFavorite}
          onDelete={(selectedMovie.id.startsWith('upload-') || selectedMovie.id.startsWith('custom-')) ? handleDeleteMovie : undefined}
        />
      )}
    </div>
  );
};

export default App;