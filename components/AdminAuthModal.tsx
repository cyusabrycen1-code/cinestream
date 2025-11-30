import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, ChevronRight, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      onSuccess();
    } else {
      setError(true);
      setPin('');
      // Reset error animation after potential shake
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center animate-fade-in p-4">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-[#141414] w-full max-w-sm rounded-xl border border-zinc-800 shadow-2xl relative overflow-hidden transform animate-scale-in">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
            <X size={20} />
        </button>

        <div className="p-8 text-center">
            <div className="mx-auto bg-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                <Lock className="text-red-600" size={28} />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-gray-400 text-sm mb-6">Enter your security PIN to access the dashboard.</p>

            <form onSubmit={handleSubmit} className="relative">
                <input 
                    ref={inputRef}
                    type="password" 
                    value={pin}
                    onChange={(e) => {
                        setPin(e.target.value);
                        setError(false);
                    }}
                    placeholder="Enter PIN"
                    className={`
                        w-full bg-black border rounded-lg py-3 px-4 text-center text-white tracking-[0.5em] text-lg focus:outline-none transition-all duration-300
                        ${error ? 'border-red-600 shake' : 'border-zinc-700 focus:border-red-600'}
                    `}
                    maxLength={4}
                />
                
                {error && (
                    <div className="absolute -bottom-6 left-0 right-0 text-red-500 text-xs flex items-center justify-center gap-1">
                        <AlertCircle size={10} />
                        <span>Invalid PIN</span>
                    </div>
                )}

                <button 
                    type="submit"
                    className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    Access Dashboard <ChevronRight size={16} />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};