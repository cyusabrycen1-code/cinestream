import React, { useState, useRef } from 'react';
import { Movie } from '../types';
import { Trash2, Plus, X, Search, LayoutDashboard, Save, Upload, Film, Image as ImageIcon, Link as LinkIcon, Loader2 } from 'lucide-react';

interface AdminDashboardProps {
  movies: Movie[];
  onAddMovie: (movie: Movie, categoryId: string) => void;
  onDeleteMovie: (movieId: string) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ movies, onAddMovie, onDeleteMovie, onClose }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Add Mode State
  const [inputType, setInputType] = useState<'url' | 'file'>('url');
  
  // Form State
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('trending');
  const [imageUrl, setImageUrl] = useState('');
  const [backdropUrl, setBackdropUrl] = useState('');
  const [rating, setRating] = useState('8.5');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [director, setDirector] = useState('');
  
  // File Upload State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [backdropFile, setBackdropFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);
  const backdropInputRef = useRef<HTMLInputElement>(null);

  const filteredMovies = movies.filter(m => 
      m && m.title && m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing delay for "uploads"
    if (inputType === 'file') {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    let finalImageUrl = imageUrl;
    let finalBackdropUrl = backdropUrl;
    let finalVideoUrl = undefined;

    if (inputType === 'file') {
        // Create Blob URLs for local files
        if (posterFile) finalImageUrl = URL.createObjectURL(posterFile);
        else finalImageUrl = 'https://picsum.photos/seed/placeholder/400/600';

        if (backdropFile) finalBackdropUrl = URL.createObjectURL(backdropFile);
        else finalBackdropUrl = finalImageUrl; // Fallback to poster if no backdrop

        if (videoFile) finalVideoUrl = URL.createObjectURL(videoFile);
    } else {
        // URL Mode fallbacks
        if (!finalImageUrl) finalImageUrl = 'https://picsum.photos/seed/placeholder/400/600';
        if (!finalBackdropUrl) finalBackdropUrl = 'https://picsum.photos/seed/placeholder_wide/1280/720';
    }

    const newMovie: Movie = {
        id: inputType === 'file' ? `upload-${Date.now()}` : `custom-${Date.now()}`,
        title,
        synopsis: synopsis || 'No synopsis provided.',
        rating: parseFloat(rating),
        year: parseInt(year),
        genres: [category.charAt(0).toUpperCase() + category.slice(1)],
        imageUrl: finalImageUrl,
        backdropUrl: finalBackdropUrl,
        cast: ['Various'],
        director: director || 'Unknown',
        duration: '2h 0m',
        matchScore: 90,
        videoUrl: finalVideoUrl
    };

    onAddMovie(newMovie, category);
    
    setIsProcessing(false);
    alert('Movie added successfully!');
    resetForm();
    setActiveTab('list');
  };

  const resetForm = () => {
    setTitle('');
    setSynopsis('');
    setDirector('');
    setImageUrl('');
    setBackdropUrl('');
    setVideoFile(null);
    setPosterFile(null);
    setBackdropFile(null);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] text-white overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-zinc-800 p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
                <div className="bg-red-600 p-2 rounded-md">
                    <LayoutDashboard size={24} className="text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold">CineStream Admin</h1>
                    <p className="text-xs text-gray-400">Content Management System</p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                <X size={24} />
            </button>
        </div>

        <div className="max-w-7xl mx-auto p-6">
            <div className="flex gap-6 mb-8">
                <button 
                    onClick={() => setActiveTab('list')}
                    className={`px-6 py-2 rounded-md font-bold transition-colors ${activeTab === 'list' ? 'bg-white text-black' : 'bg-zinc-900 text-gray-400 hover:text-white'}`}
                >
                    Manage Library
                </button>
                <button 
                    onClick={() => setActiveTab('add')}
                    className={`px-6 py-2 rounded-md font-bold transition-colors flex items-center gap-2 ${activeTab === 'add' ? 'bg-red-600 text-white' : 'bg-zinc-900 text-gray-400 hover:text-white'}`}
                >
                    <Plus size={18} />
                    Add Movie
                </button>
            </div>

            {activeTab === 'list' && (
                <div className="space-y-4 animate-fade-in">
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <input 
                                type="text" 
                                placeholder="Search your library..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-red-600"
                            />
                            <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
                        </div>
                        <div className="bg-zinc-900 px-4 py-3 rounded-md text-gray-400 border border-zinc-800">
                            Total: <span className="text-white font-bold">{movies.length}</span>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-900 text-gray-400 text-sm uppercase">
                                    <th className="p-4">Movie</th>
                                    <th className="p-4">Year</th>
                                    <th className="p-4">Rating</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {filteredMovies.map(movie => (
                                    <tr key={movie.id} className="hover:bg-zinc-900 transition-colors group">
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={movie.imageUrl} alt="" className="w-10 h-14 object-cover rounded bg-zinc-800" />
                                            <div>
                                                <span className="font-medium text-gray-200 block">{movie.title}</span>
                                                {movie.videoUrl && <span className="text-xs text-red-500 font-bold uppercase tracking-wider">Uploaded Video</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">{movie.year}</td>
                                        <td className="p-4 text-gray-400">
                                            <span className="bg-green-900/30 text-green-500 px-2 py-1 rounded text-xs border border-green-900">{movie.rating}</span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => onDeleteMovie(movie.id)}
                                                className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredMovies.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No movies found.</div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'add' && (
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <form onSubmit={handleAdd} className="space-y-6 bg-zinc-900/50 p-8 rounded-xl border border-zinc-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Add New Movie</h2>
                            
                            {/* Input Type Toggle */}
                            <div className="bg-black p-1 rounded-lg border border-zinc-800 flex">
                                <button
                                    type="button"
                                    onClick={() => setInputType('url')}
                                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${inputType === 'url' ? 'bg-zinc-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    <LinkIcon size={16} /> Link URL
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setInputType('file')}
                                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${inputType === 'file' ? 'bg-zinc-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    <Upload size={16} /> Upload File
                                </button>
                            </div>
                        </div>
                        
                        {/* Common Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Title</label>
                                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black border border-zinc-700 rounded p-3 focus:border-red-600 outline-none transition-colors" placeholder="Movie Title" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Director</label>
                                <input type="text" value={director} onChange={e => setDirector(e.target.value)} className="w-full bg-black border border-zinc-700 rounded p-3 focus:border-red-600 outline-none transition-colors" placeholder="Director Name" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Synopsis</label>
                            <textarea required value={synopsis} onChange={e => setSynopsis(e.target.value)} className="w-full bg-black border border-zinc-700 rounded p-3 focus:border-red-600 outline-none h-24 resize-none transition-colors" placeholder="Movie description..." />
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                             <div>
                                <label className="block text-sm text-gray-400 mb-2">Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black border border-zinc-700 rounded p-3 focus:border-red-600 outline-none text-white transition-colors">
                                    <option value="trending">Trending</option>
                                    <option value="uploads">My Uploads</option>
                                    <option value="action">Action</option>
                                    <option value="scifi">Sci-Fi</option>
                                    <option value="drama">Drama</option>
                                    <option value="comedy">Comedy</option>
                                    <option value="horror">Horror</option>
                                    <option value="animation">Animation</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm text-gray-400 mb-2">Year</label>
                                <input type="number" value={year} onChange={e => setYear(e.target.value)} className="w-full bg-black border border-zinc-700 rounded p-3 focus:border-red-600 outline-none transition-colors" />
                            </div>
                             <div>
                                <label className="block text-sm text-gray-400 mb-2">Rating</label>
                                <input type="number" step="0.1" max="10" value={rating} onChange={e => setRating(e.target.value)} className="w-full bg-black border border-zinc-700 rounded p-3 focus:border-red-600 outline-none transition-colors" />
                            </div>
                        </div>

                        {/* CONDITIONAL INPUTS */}
                        {inputType === 'url' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                                 <div>
                                    <label className="block text-sm text-gray-400 mb-2">Poster Image URL</label>
                                    <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-black border border-zinc-700 rounded p-3 focus:border-red-600 outline-none transition-colors" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Backdrop Image URL (Wide)</label>
                                    <input type="url" value={backdropUrl} onChange={e => setBackdropUrl(e.target.value)} className="w-full bg-black border border-zinc-700 rounded p-3 focus:border-red-600 outline-none transition-colors" placeholder="https://..." />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                                {/* Video File */}
                                <div 
                                    onClick={() => videoInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors h-40 ${videoFile ? 'border-green-500 bg-green-900/10' : 'border-zinc-700 hover:border-gray-500 hover:bg-zinc-900'}`}
                                >
                                    <input type="file" accept="video/*" className="hidden" ref={videoInputRef} onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
                                    <Film size={32} className={videoFile ? 'text-green-500' : 'text-gray-500'} />
                                    <span className="mt-2 text-xs text-gray-400 font-medium truncate max-w-full text-center">
                                        {videoFile ? videoFile.name : 'Select Video'}
                                    </span>
                                </div>

                                {/* Poster File */}
                                <div 
                                    onClick={() => posterInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors h-40 relative overflow-hidden ${posterFile ? 'border-zinc-600' : 'border-zinc-700 hover:border-gray-500 hover:bg-zinc-900'}`}
                                >
                                    <input type="file" accept="image/*" className="hidden" ref={posterInputRef} onChange={(e) => setPosterFile(e.target.files?.[0] || null)} />
                                    {posterFile ? (
                                        <img src={URL.createObjectURL(posterFile)} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                    ) : (
                                        <ImageIcon size={32} className="text-gray-500" />
                                    )}
                                    <span className="mt-2 text-xs text-gray-400 font-medium z-10 relative drop-shadow-md">
                                        {posterFile ? 'Change Poster' : 'Select Poster'}
                                    </span>
                                </div>

                                {/* Backdrop File */}
                                <div 
                                    onClick={() => backdropInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors h-40 relative overflow-hidden ${backdropFile ? 'border-zinc-600' : 'border-zinc-700 hover:border-gray-500 hover:bg-zinc-900'}`}
                                >
                                    <input type="file" accept="image/*" className="hidden" ref={backdropInputRef} onChange={(e) => setBackdropFile(e.target.files?.[0] || null)} />
                                     {backdropFile ? (
                                        <img src={URL.createObjectURL(backdropFile)} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                    ) : (
                                        <ImageIcon size={32} className="text-gray-500" />
                                    )}
                                    <span className="mt-2 text-xs text-gray-400 font-medium z-10 relative drop-shadow-md">
                                        {backdropFile ? 'Change Backdrop' : 'Select Backdrop'}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="pt-4 border-t border-zinc-800 flex justify-end gap-4">
                            <button type="button" onClick={() => setActiveTab('list')} className="px-6 py-3 rounded font-bold text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <button 
                                type="submit" 
                                disabled={isProcessing || (inputType === 'file' && !videoFile)}
                                className={`px-8 py-3 rounded font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20 flex items-center gap-2 transition-all ${isProcessing || (inputType === 'file' && !videoFile) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isProcessing ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : <><Save size={20} /> Save Movie</>}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    </div>
  );
};