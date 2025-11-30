import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  isLarge?: boolean;
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onMovieClick, isLarge }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);


  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 1.5 : clientWidth / 1.5;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ref = rowRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', handleScroll);
    };
  }, [movies]);

  if (movies.length === 0) return null;

  return (
    <div 
        ref={containerRef}
        className={`space-y-2 md:space-y-4 my-8 relative group z-0 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-100 px-4 sm:px-6 lg:px-8 group-hover:text-red-600 transition-colors duration-300 cursor-pointer flex items-center gap-2">
        {title}
        <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-10px] group-hover:translate-x-0 text-red-500">Explore All &gt;</span>
      </h2>
      
      <div className="relative group/row">
        {/* Left Arrow */}
        <button 
            className={`absolute left-0 top-0 bottom-0 z-40 bg-gradient-to-r from-black/80 to-transparent w-16 flex items-center justify-center transition-all duration-300 ${!showLeftArrow ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/row:opacity-100'}`}
            onClick={() => scroll('left')}
        >
            <ChevronLeft className="text-white w-12 h-12 hover:scale-125 transition-transform drop-shadow-lg" />
        </button>

        {/* Scroll Container */}
        <div 
            ref={rowRef}
            className="flex items-center space-x-2 md:space-x-4 overflow-x-auto overflow-y-visible no-scrollbar px-4 sm:px-6 lg:px-8 pb-12 pt-4 scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={onMovieClick} 
                isLarge={isLarge}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button 
            className={`absolute right-0 top-0 bottom-0 z-40 bg-gradient-to-l from-black/80 to-transparent w-16 flex items-center justify-center transition-all duration-300 ${!showRightArrow ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/row:opacity-100'}`}
            onClick={() => scroll('right')}
        >
            <ChevronRight className="text-white w-12 h-12 hover:scale-125 transition-transform drop-shadow-lg" />
        </button>
      </div>
    </div>
  );
};