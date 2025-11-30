import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onInfoClick: (movie: Movie) => void;
  onPlayClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ movie, onInfoClick, onPlayClick }) => {
  return (
    <div className="relative w-full h-[85vh] md:h-[95vh] lg:h-[85vh] overflow-hidden group">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover opacity-80 animate-ken-burns origin-center"
        />
        {/* Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent bottom-0 h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl space-y-6 animate-fade-in-up">
           {/* Tags/Match */}
           <div className="flex items-center gap-4 text-sm font-bold tracking-wide">
             <div className="flex items-center gap-1 text-green-500 drop-shadow-md">
               <span>{movie.matchScore}% Match</span>
             </div>
             <span className="text-gray-300 drop-shadow-md">{movie.year}</span>
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
              className="flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-md font-bold hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
            >
              <Play fill="currentColor" size={26} />
              <span className="text-lg">Play Now</span>
            </button>
            <button 
              onClick={() => onInfoClick(movie)}
              className="flex items-center gap-3 bg-gray-600/40 backdrop-blur-md text-white px-8 py-3.5 rounded-md font-bold hover:bg-gray-600/60 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/20"
            >
              <Info size={26} />
              <span className="text-lg">More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};