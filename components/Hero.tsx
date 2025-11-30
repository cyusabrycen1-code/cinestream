import React, { useState, useEffect } from 'react';
import { Play, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  movies: Movie[];
  onInfoClick: (movie: Movie) => void;
  onPlayClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ movies, onInfoClick, onPlayClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        setIsAnimating(false);
    }, 500); // Wait for fade out
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
        setIsAnimating(false);
    }, 500);
  };

  if (!movies || movies.length === 0) return null;

  const movie = movies[currentIndex];

  return (
    <div className="relative w-full h-[85vh] md:h-[95vh] lg:h-[85vh] overflow-hidden group bg-zinc-900">
      
      {/* Background Image Layer with Crossfade */}
      <div key={movie.id} className={`absolute inset-0 transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={movie.backdropUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover animate-ken-burns origin-center"
            />
            {/* Cinematic Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent bottom-0 h-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-40" />
          </div>
      </div>

      {/* Content Layer */}
      <div className={`relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 transition-all duration-700 transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <div className="max-w-3xl space-y-6">
           {/* Tags/Match */}
           <div className="flex items-center gap-4 text-sm font-bold tracking-wide">
             <div className="flex items-center gap-1 text-green-500 drop-shadow-md bg-black/40 backdrop-blur-md px-2 py-1 rounded-md border border-green-500/20">
               <span>{movie.matchScore}% Match</span>
             </div>
             <span className="text-gray-200 drop-shadow-md">{movie.year}</span>
             <span className="border border-gray-400/50 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-gray-200">HD</span>
             <div className="flex gap-2">
                {movie.genres.slice(0, 3).map((g, i) => (
                    <React.Fragment key={g}>
                      <span className="text-white drop-shadow-lg">{g}</span>
                      {i < 2 && <span className="text-red-600">•</span>}
                    </React.Fragment>
                ))}
             </div>
           </div>

          {/* Title */}
          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400 leading-[0.9] tracking-tighter drop-shadow-2xl uppercase">
            {movie.title}
          </h1>

          {/* Synopsis */}
          <p className="text-lg md:text-xl text-gray-200 line-clamp-3 md:line-clamp-none drop-shadow-lg max-w-2xl font-medium leading-relaxed">
            {movie.synopsis}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-8">
            <button 
              onClick={onPlayClick}
              className="flex items-center gap-3 bg-red-600 text-white px-8 py-3.5 rounded-md font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_rgba(220,38,38,0.8)]"
            >
              <Play fill="currentColor" size={26} />
              <span className="text-lg">Play Now</span>
            </button>
            <button 
              onClick={() => onInfoClick(movie)}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-md font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/20"
            >
              <Info size={26} />
              <span className="text-lg">More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Navigation */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-2">
        <button onClick={handlePrev} className="p-3 rounded-full bg-white/10 hover:bg-red-600/80 backdrop-blur-sm border border-white/20 transition-all">
            <ChevronLeft size={24} className="text-white" />
        </button>
        <button onClick={handleNext} className="p-3 rounded-full bg-white/10 hover:bg-red-600/80 backdrop-blur-sm border border-white/20 transition-all">
            <ChevronRight size={24} className="text-white" />
        </button>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {movies.map((_, idx) => (
            <button 
                key={idx} 
                onClick={() => {
                     if (isAnimating) return;
                     setIsAnimating(true);
                     setTimeout(() => {
                        setCurrentIndex(idx);
                        setIsAnimating(false);
                     }, 500);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-red-600' : 'w-2 bg-gray-500 hover:bg-gray-300'}`}
            />
        ))}
      </div>
    </div>
  );
};