import React, { useEffect, useState } from 'react';
import { X, Play, Plus, ThumbsUp, Volume2, VolumeX, Trash2 } from 'lucide-react';
import { Movie } from '../types';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  onPlay: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose, onPlay, isFavorite, onToggleFavorite, onDelete }) => {
  const [muted, setMuted] = useState(false);
  
  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden'; // Lock body scroll
    return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start pt-10 md:items-center md:pt-0 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
        {/* Backdrop overlay click to close */}
        <div className="absolute inset-0" onClick={onClose}></div>

        <div className="relative w-full max-w-5xl bg-[#141414] rounded-xl shadow-2xl overflow-hidden mx-4 my-8 md:my-0 ring-1 ring-white/10 transform transition-all animate-scale-in origin-center">
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 h-10 w-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-[#181818] transition-colors text-white border border-white/10 group"
            >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Hero Image Section */}
            <div className="relative h-[400px] md:h-[550px]">
                <div className="absolute inset-0">
                    <img src={movie.backdropUrl} alt={movie.title} className="w-full h-full object-cover" />
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/60 via-transparent to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tight leading-none">{movie.title}</h2>
                    
                    <div className="flex flex-wrap items-center gap-4">
                         <button onClick={onPlay} className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-black/50">
                            <Play fill="currentColor" size={24} />
                            Play
                         </button>
                         <button 
                            onClick={() => onToggleFavorite(movie.id)}
                            className={`flex items-center justify-center h-12 w-12 rounded-full border-2 transition-colors ${isFavorite ? 'border-red-600 text-red-600 bg-red-600/10' : 'border-gray-400 text-gray-300 hover:border-white hover:text-white'}`}
                         >
                            <Plus size={24} className={isFavorite ? 'rotate-45 transition-transform' : 'transition-transform'} />
                         </button>
                         
                         {onDelete ? (
                             <button 
                                onClick={() => onDelete(movie.id)}
                                className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-red-900 text-red-500 hover:border-red-600 hover:bg-red-600 hover:text-white transition-colors"
                                title="Delete Upload"
                             >
                                <Trash2 size={20} />
                             </button>
                         ) : (
                             <button className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white transition-colors">
                                <ThumbsUp size={20} />
                             </button>
                         )}

                         <button onClick={() => setMuted(!muted)} className="ml-auto text-gray-400 hover:text-white transition-colors h-10 w-10 border border-gray-600 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
                             {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                         </button>
                    </div>
                </div>
            </div>

            {/* Info Grid */}
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 bg-[#141414]">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
                        <span className="text-green-500 font-bold text-lg">{movie.matchScore}% Match</span>
                        <span className="flex items-center gap-1 text-gray-400">{movie.year}</span>
                        <span className="flex items-center gap-1 text-gray-400">{movie.duration}</span>
                        <span className="border border-gray-500 px-1.5 rounded-sm text-xs text-white uppercase">HD</span>
                    </div>
                    
                    <p className="text-white text-lg leading-relaxed font-light text-gray-200">
                        {movie.synopsis}
                    </p>
                    
                    <div className="h-px w-full bg-white/10 my-6" />
                    
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <span className="text-gray-500 font-bold block mb-1 text-sm uppercase tracking-wide">Director</span>
                            <span className="text-white hover:underline cursor-pointer decoration-red-600 underline-offset-4">{movie.director}</span>
                         </div>
                         <div>
                            <span className="text-gray-500 font-bold block mb-1 text-sm uppercase tracking-wide">Genres</span>
                            <span className="text-white">{movie.genres.join(', ')}</span>
                         </div>
                    </div>
                </div>

                <div className="space-y-6 text-sm text-gray-400">
                    <div>
                        <span className="text-gray-500 font-bold block mb-2 uppercase tracking-wide">Cast</span>
                        <div className="flex flex-col gap-2">
                            {movie.cast.map(actor => (
                                <span key={actor} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer block">{actor}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-500 font-bold block mb-2 uppercase tracking-wide">Maturity Rating</span>
                        <span className="border border-gray-500 px-2 py-0.5 rounded-sm text-white text-xs inline-block">PG-13</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};