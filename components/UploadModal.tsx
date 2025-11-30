import React, { useState, useRef } from 'react';
import { X, Upload, Film, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Movie } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (movie: Movie) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [genre, setGenre] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !title) return;

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
        const newMovie: Movie = {
            id: `upload-${Date.now()}`,
            title,
            synopsis: synopsis || 'No description provided.',
            rating: 10,
            year: new Date().getFullYear(),
            genres: [genre || 'Indie'],
            imageUrl: imageFile ? URL.createObjectURL(imageFile) : 'https://picsum.photos/seed/placeholder/400/600',
            backdropUrl: imageFile ? URL.createObjectURL(imageFile) : 'https://picsum.photos/seed/placeholder_wide/1280/720',
            cast: ['You'],
            director: 'You',
            duration: 'Unknown',
            matchScore: 100,
            videoUrl: URL.createObjectURL(videoFile)
        };
        
        onUpload(newMovie);
        setIsUploading(false);
        onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#141414] w-full max-w-2xl rounded-xl border border-zinc-800 shadow-2xl relative overflow-hidden">
        
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Upload className="text-red-600" />
                Upload to Studio
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                    <input 
                        type="text" 
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                        placeholder="My Awesome Movie"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Synopsis</label>
                    <textarea 
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 h-24 resize-none"
                        placeholder="What is your video about?"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Genre</label>
                        <select 
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-red-600 focus:outline-none"
                        >
                            <option value="">Select Genre</option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Horror">Horror</option>
                            <option value="Vlog">Vlog</option>
                        </select>
                     </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video Upload */}
                <div 
                    onClick={() => videoInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${videoFile ? 'border-green-500 bg-green-500/10' : 'border-zinc-700 hover:border-gray-500 hover:bg-zinc-900'}`}
                >
                    <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        ref={videoInputRef}
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    />
                    <Film size={32} className={videoFile ? 'text-green-500' : 'text-gray-500'} />
                    <span className="mt-2 text-sm text-gray-400 font-medium truncate max-w-full px-2">
                        {videoFile ? videoFile.name : 'Select Video File'}
                    </span>
                </div>

                {/* Image Upload */}
                <div 
                    onClick={() => imageInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden ${imageFile ? 'border-zinc-700' : 'border-zinc-700 hover:border-gray-500 hover:bg-zinc-900'}`}
                >
                     <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={imageInputRef}
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                    {imageFile ? (
                        <img src={URL.createObjectURL(imageFile)} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    ) : (
                        <ImageIcon size={32} className="text-gray-500" />
                    )}
                    <span className="mt-2 text-sm text-gray-400 font-medium z-10 relative drop-shadow-md">
                        {imageFile ? 'Change Thumbnail' : 'Select Thumbnail'}
                    </span>
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button 
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 rounded text-sm font-bold text-gray-300 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    disabled={!videoFile || isUploading}
                    className={`px-8 py-2 rounded text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2 ${(!videoFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isUploading ? <><Loader2 className="animate-spin" size={16} /> Uploading...</> : 'Upload Video'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};