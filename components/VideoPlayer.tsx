import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
  title?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onClose, title }) => {
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center animate-fade-in">
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <h3 className="text-white font-bold text-lg pointer-events-auto">{title || 'Playing Video'}</h3>
        <button 
            onClick={onClose}
            className="text-white hover:text-red-500 transition-colors p-2 bg-black/20 rounded-full pointer-events-auto"
        >
            <X size={32} />
        </button>
      </div>
      
      <div className="w-full h-full max-w-7xl max-h-screen aspect-video flex items-center justify-center">
         <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-contain focus:outline-none"
         >
            Your browser does not support the video tag.
         </video>
      </div>
    </div>
  );
};