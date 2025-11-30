import React, { useState } from 'react';
import { Movie } from '../types';
import { Play, Plus, ChevronDown, ThumbsUp } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isLarge?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, isLarge = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
        className={`relative flex-none transition-all duration-300 ease-in-out z-10 hover:z-50 ${isLarge ? 'w-[200px] md:w-[350px]' : 'w-[160px] md:w-[240px]'} h-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(movie)}
    >
      <div 
        className={`
          relative rounded-md bg-zinc-900 shadow-xl 
          transform transition-all duration-500 ease-bezier
          ${isHovered ? 'scale-125 -translate-y-8 shadow-[0_0_30px_rgba(220,38,38,0.4)] ring-2 ring-red-600/50' : 'ring-0'}
        `}
      >
        {/* Main Image */}
        <div className={`relative overflow-hidden rounded-t-md ${isLarge ? 'aspect-video' : 'aspect-[2/3]'} ${isHovered ? 'rounded-b-none' : 'rounded-b-md'}`}>
            {!imageLoaded && <div className="absolute inset-0 shimmer" />}
            <img
                src={isLarge ? movie.backdropUrl : movie.imageUrl}
                alt={movie.title}
                onLoad={() => setImageLoaded(true)}
                className={`
                  w-full h-full object-cover transition-all duration-500 
                  ${!imageLoaded ? 'opacity-0' : 'opacity-100'}
                  ${isHovered ? 'brightness-110' : 'brightness-90'}
                `}
                loading="lazy"
            />
            {isLarge && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />}
            
            {/* Title Overlay for Large Cards (always visible) */}
            {isLarge && !isHovered && (
                 <div className="absolute bottom-4 left-4 right-4">
                     <h3 className="text-white font-bold drop-shadow-md">{movie.title}</h3>
                 </div>
            )}
        </div>
        
        {/* Hover Details Overlay */}
        <div 
            className={`
                absolute top-full left-0 right-0 bg-zinc-900 rounded-b-md p-4 shadow-2xl
                transition-all duration-300 overflow-hidden
                ${isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
            `}
        >
            <div className="flex items-center gap-3 mb-4">
                <button className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 shadow-lg">
                    <Play size={14} fill="currentColor" />
                </button>
                <button className="h-8 w-8 rounded-full border-2 border-gray-500 text-gray-300 flex items-center justify-center hover:border-white hover:text-white transition-colors hover:scale-110">
                    <Plus size={16} />
                </button>
                <button className="h-8 w-8 rounded-full border-2 border-gray-500 text-gray-300 flex items-center justify-center hover:border-white hover:text-white transition-colors hover:scale-110">
                    <ThumbsUp size={14} />
                </button>
                <button 
                  className="ml-auto h-8 w-8 rounded-full border-2 border-gray-500 text-gray-300 flex items-center justify-center hover:border-white hover:text-white transition-colors hover:scale-110 group/btn"
                  onClick={(e) => {
                      e.stopPropagation();
                      onClick(movie);
                  }}
                >
                    <ChevronDown size={16} className="group-hover/btn:animate-bounce" />
                </button>
            </div>
            
            <h3 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-1">{movie.title}</h3>
            
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                <span className="text-green-500 font-bold">{movie.matchScore}% Match</span>
                <span className="border border-gray-600 px-1 rounded-sm text-[10px] text-gray-300">HD</span>
                <span>{movie.duration}</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
                {movie.genres.slice(0, 3).map((genre, idx) => (
                    <span key={idx} className="text-[10px] text-gray-400 flex items-center bg-white/5 px-1.5 py-0.5 rounded-sm">
                        {genre}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};