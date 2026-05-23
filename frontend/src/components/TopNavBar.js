import React from 'react';

const TopNavBar = ({ onSearch, movie, setMovie, loading }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl no-border bg-gradient-to-b from-neutral-950/80 to-transparent">
      <div className="flex justify-between items-center px-8 py-4 w-full">
        <div className="flex items-center gap-12">
          <span className="text-2xl font-black tracking-tighter text-red-600 dark:text-red-500 font-headline">CINE-AI</span>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-white font-bold font-manrope text-sm tracking-tight transition-all duration-300" href="#">Browse</a>
            <a className="text-neutral-400 hover:text-white transition-colors font-manrope text-sm tracking-tight scale-95 active:scale-90" href="#">My List</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <form onSubmit={onSearch} className="relative group hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">search</span>
            <input 
              className="bg-neutral-900 border-0 rounded-full py-2 pl-10 pr-4 text-xs w-64 focus:ring-1 focus:ring-primary text-white" 
              placeholder="Search titles..." 
              type="text"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
            />
          </form>
          <button className="text-neutral-400 hover:text-white transition-colors scale-95 active:scale-90">
            <span className="material-symbols-outlined">psychology</span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfx5fQ-BFrMACW8azFrkQFvZ0wiCM1wSyDO4miCb7s9pZCY1dEfkvvP22dy08-REYO3gY_tHDK6WqPQuqz2olCFbNpxnCZUcZcZojQaDIMQpyLZlQClwrmX2FApX0xjaTv0VPWtoSr9gXVoemTQQmIkmrSvC_mTPF--CGcV6bNfw4epZKSYdi_R_YUAQPVyNQarwS59Ft5g7XLDL2fkWAXx4xr5WXsKmRPMh9Ona6uFrg7KtIicXRAq9WlLaAYQPTSzoXPj4UK94HL"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
