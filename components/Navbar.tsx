import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, User, X, ChevronDown } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isScrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, currentView, onNavigate, isScrolled }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSearch(false);
      setQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md shadow-xl' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <div 
              className="flex-shrink-0 cursor-pointer group" 
              onClick={() => onNavigate('home')}
            >
              <h1 className="text-3xl font-extrabold text-red-600 tracking-tighter transform transition-transform group-hover:scale-105 drop-shadow-[0_2px_4px_rgba(220,38,38,0.3)]">
                CINESTREAM
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <NavButton label="Home" active={currentView === 'home'} onClick={() => onNavigate('home')} />
                <NavButton label="Movies" active={currentView === 'movies'} onClick={() => onNavigate('movies')} />
                <NavButton label="Series" active={currentView === 'series'} onClick={() => onNavigate('series')} />
                <NavButton label="My List" active={currentView === 'favorites'} onClick={() => onNavigate('favorites')} />
              </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center gap-6">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="relative animate-fade-in-right">
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Titles, people, genres"
                  className="bg-black/80 border border-gray-600 text-white text-sm rounded-none pl-4 pr-10 py-1.5 focus:outline-none focus:border-red-600 transition-all w-64"
                  onBlur={() => !query && setShowSearch(false)}
                />
                <button type="submit" className="absolute right-3 top-1.5 text-gray-400 hover:text-red-500 transition-colors">
                  <Search size={16} />
                </button>
              </form>
            ) : (
              <button onClick={() => setShowSearch(true)} className="text-gray-300 hover:text-white transition-colors">
                <Search size={22} />
              </button>
            )}
            
            <button className="text-gray-300 hover:text-white transition-colors relative group">
              <Bell size={22} className="group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
            </button>

            {/* Account Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                onBlur={() => setTimeout(() => setProfileOpen(false), 200)} // Delay to allow clicks inside menu
                className="flex items-center gap-2 cursor-pointer group focus:outline-none"
              >
                <img 
                  src="https://picsum.photos/seed/user_alex/200/200" 
                  alt="User" 
                  className="h-8 w-8 rounded-sm border-2 border-transparent group-hover:border-red-600 transition-all" 
                />
                <ChevronDown 
                  size={16} 
                  className={`text-white transition-transform duration-300 ${profileOpen ? 'rotate-180' : 'rotate-0'}`} 
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 bg-black/95 backdrop-blur-md border border-gray-800 rounded-md shadow-2xl py-2 animate-fade-in origin-top-right ring-1 ring-white/10 z-50">
                  <div className="px-4 py-3 border-b border-gray-800 mb-1">
                      <div className="flex items-center gap-3 mb-2">
                        <img src="https://picsum.photos/seed/user_alex/200/200" className="h-8 w-8 rounded-sm" />
                        <span className="text-sm font-bold text-white">Alex</span>
                      </div>
                      <p className="text-xs text-gray-400 hover:underline cursor-pointer">Manage Profiles</p>
                  </div>
                  
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors">Account</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors">Help Center</a>
                  </div>
                  
                  <div className="border-t border-gray-800 my-1 pt-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors">Sign out of CineStream</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile User Icon */}
             <button onClick={() => onNavigate('favorites')}>
                <img 
                  src="https://picsum.photos/seed/user_alex/200/200" 
                  alt="User" 
                  className="h-7 w-7 rounded-sm border border-transparent" 
                />
             </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 absolute w-full pb-4 animate-fade-in shadow-2xl">
           <form onSubmit={handleSearchSubmit} className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search titles..."
                  className="w-full bg-zinc-900 text-white p-3 rounded-md border border-zinc-800 pl-10 focus:outline-none focus:border-red-600 focus:ring-0"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
           </form>
           <div className="flex flex-col space-y-1 px-2">
              <MobileNavButton label="Home" active={currentView === 'home'} onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} />
              <MobileNavButton label="Movies" active={currentView === 'movies'} onClick={() => { onNavigate('movies'); setMobileMenuOpen(false); }} />
              <MobileNavButton label="Series" active={currentView === 'series'} onClick={() => { onNavigate('series'); setMobileMenuOpen(false); }} />
              <MobileNavButton label="My List" active={currentView === 'favorites'} onClick={() => { onNavigate('favorites'); setMobileMenuOpen(false); }} />
              
              <div className="border-t border-zinc-800 my-2 pt-2">
                <MobileNavButton label="Account" active={false} onClick={() => setMobileMenuOpen(false)} />
                <MobileNavButton label="Sign Out" active={false} onClick={() => setMobileMenuOpen(false)} />
              </div>
           </div>
        </div>
      )}
    </nav>
  );
};

const NavButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
      active ? 'text-white cursor-default font-bold' : 'text-gray-400 hover:text-gray-200'
    }`}
  >
    {label}
  </button>
);

const MobileNavButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors ${
        active ? 'bg-zinc-800 text-white font-bold border-l-4 border-red-600' : 'text-gray-300 hover:text-white hover:bg-zinc-900'
    }`}
  >
    {label}
  </button>
);