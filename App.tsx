import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MovieRow } from './components/MovieRow';
import { MovieDetails } from './components/MovieDetails';
import { Movie, ViewState } from './types';
import { INITIAL_FEATURED_MOVIE, FALLBACK_MOVIES } from './constants';
import { fetchMoviesAI } from './services/geminiService';
import { Loader2 } from 'lucide-react';

// Use FALLBACK_MOVIES initially, but we will try to fetch better ones
const INITIAL_CATEGORIES = [
  { id: 'trending', title: 'Trending Now' },
  { id: 'action', title: 'High Octane Action' },
  { id: 'scifi', title: 'Sci-Fi & Cyberpunk' },
  { id: 'drama', title: 'Award Winning Dramas' }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // Data State
  const [featuredMovie, setFeaturedMovie] = useState<Movie>(INITIAL_FEATURED_MOVIE);
  const [categoryMovies, setCategoryMovies] = useState<Record<string, Movie[]>>({
    'trending': FALLBACK_MOVIES, // Initial population
    'action': [],
    'scifi': [],
    'drama': []
  });
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Handlers
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial Data Load from Gemini
  useEffect(() => {
    const loadData = async () => {
      // We load categories sequentially or parallel to not hit rate limits too hard if using free tier
      // For this demo, we'll try to fetch a couple
      
      const actionMovies = await fetchMoviesAI('Action Movies 2024');
      if (actionMovies.length > 0) {
        setCategoryMovies(prev => ({ ...prev, 'action': actionMovies }));
      }

      // Small delay to be gentle
      await new Promise(r => setTimeout(r, 1000));

      const scifiMovies = await fetchMoviesAI('Sci-Fi Movies Futuristic');
      if (scifiMovies.length > 0) {
        setCategoryMovies(prev => ({ ...prev, 'scifi': scifiMovies }));
      }
      
       await new Promise(r => setTimeout(r, 1000));

       const dramaMovies = await fetchMoviesAI('Intense Drama Movies');
       if (dramaMovies.length > 0) {
        setCategoryMovies(prev => ({ ...prev, 'drama': dramaMovies }));
      }
    };

    loadData();
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setCurrentView('search');
    const results = await fetchMoviesAI(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handlePlayMovie = () => {
    // In a real app, this would route to a player
    alert("Playing movie... (This is a demo)");
  };

  const getFavoritesMovies = () => {
    // Collect all movies currently in state to find full objects for favorite IDs
    const allMovies = [
      featuredMovie,
      ...Object.values(categoryMovies).flat(),
      ...searchResults,
      ...FALLBACK_MOVIES
    ];
    // De-duplicate by ID
    const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());
    return uniqueMovies.filter(m => favorites.includes(m.id));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      <Navbar 
        onSearch={handleSearch} 
        currentView={currentView} 
        onNavigate={setCurrentView}
        isScrolled={isScrolled}
      />

      {/* Main Content Area */}
      <main className="pb-20">
        
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <Hero 
                movie={featuredMovie} 
                onInfoClick={setSelectedMovie} 
                onPlayClick={handlePlayMovie}
            />
            
            <div className="relative z-20 -mt-24 md:-mt-48 pl-0 space-y-8 bg-gradient-to-t from-black via-black to-transparent pt-12">
               {INITIAL_CATEGORIES.map(cat => (
                  <MovieRow 
                    key={cat.id} 
                    title={cat.title} 
                    movies={categoryMovies[cat.id] || []} 
                    onMovieClick={setSelectedMovie}
                    isLarge={cat.id === 'trending'} 
                  />
               ))}
            </div>
          </div>
        )}

        {/* SEARCH VIEW */}
        {currentView === 'search' && (
          <div className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-white">Search Results</h2>
            {isSearching ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-red-600 w-12 h-12" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {searchResults.map(movie => (
                   <div key={movie.id} className="transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src={movie.imageUrl} 
                        alt={movie.title} 
                        className="rounded-sm shadow-lg cursor-pointer w-full h-auto aspect-[2/3] object-cover border border-zinc-800 hover:border-red-600"
                        onClick={() => setSelectedMovie(movie)}
                      />
                      <p className="mt-2 text-sm font-medium text-gray-300 truncate group-hover:text-white">{movie.title}</p>
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
                <MovieRow 
                    title={`Popular ${currentView === 'movies' ? 'Movies' : 'Series'}`}
                    movies={FALLBACK_MOVIES} 
                    onMovieClick={setSelectedMovie}
                />
                 <div className="text-center text-gray-500 mt-12 flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-red-600" size={32} />
                    <p>Fetching latest {currentView} via AI...</p>
                 </div>
            </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-12 px-4 text-center text-gray-500 text-sm">
        <p>&copy; 2024 CineStream AI. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
            <span className="hover:text-red-500 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-red-500 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-red-500 transition-colors cursor-pointer">Help</span>
        </div>
      </footer>

      {/* Modal */}
      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          onPlay={handlePlayMovie}
          isFavorite={favorites.includes(selectedMovie.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
};

export default App;