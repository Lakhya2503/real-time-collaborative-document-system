import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FolderDot, Activity, Sparkles, Shield, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import ThemeToggle from '../../components/common/ThemeToggle';
import { BRAND_NAME } from '../../utils/constants';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7FAFF] dark:bg-[#070B14] text-[#081B3A] dark:text-[#E5E7EB] transition-colors duration-300 flex flex-col justify-between select-none">
      
      {/* 1. Header Navigation */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-[#E5E7EB] dark:border-white/10 transition-colors duration-300 bg-white/70 dark:bg-[#070B14]/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <FolderDot size={18} className="text-[#0D6EFD]" />
          <span className="font-sans font-extrabold text-sm uppercase tracking-widest">{BRAND_NAME}</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login" className="text-xs font-bold text-[#6B7280] dark:text-[#94A3B8] hover:text-[#081B3A] dark:hover:text-[#E5E7EB] transition-colors">
            Sign In
          </Link>
          <Button size="sm" onClick={() => navigate('/register')}>
            Sign Up Free
          </Button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 md:py-24 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D6EFD]/10 text-[#0D6EFD] text-[10px] font-bold rounded-full uppercase tracking-wider">
          <Sparkles size={11} />
          <span>Real-time co-authoring workspace</span>
        </div>

        <h1 className="font-sans font-extrabold text-3xl md:text-5xl lg:text-6xl text-[#081B3A] dark:text-white leading-tight tracking-tight transition-colors">
          The collaborative workspace for <span className="text-[#0D6EFD]">modern engineering</span> teams.
        </h1>

        <p className="text-xs md:text-sm text-[#6B7280] dark:text-[#94A3B8] max-w-2xl leading-relaxed font-semibold transition-colors">
          Co-edit specifications, project proposals, version checkpoints, and meeting notes in real-time. Features fluid typing presence, collaborative cursor indicators, and Microsoft Word inspired tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button size="lg" onClick={() => navigate('/register')} icon={ArrowRight}>
            Create your Workspace
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
            Live Demo System
          </Button>
        </div>

        {/* 3. Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 md:pt-16 w-full text-left">
          
          <div className="glass-card p-5 border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#0F172A] shadow-sm rounded-xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center shrink-0">
              <Activity size={15} />
            </div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#081B3A] dark:text-[#E5E7EB]">
              Real-time Typing Sync
            </h4>
            <p className="text-[10px] leading-relaxed text-[#6B7280] dark:text-[#94A3B8] font-semibold">
              Live websockets connections synchronize changes, typing logs, active comments, and caret positions globally within milliseconds.
            </p>
          </div>

          <div className="glass-card p-5 border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#0F172A] shadow-sm rounded-xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Sparkles size={15} />
            </div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#081B3A] dark:text-[#E5E7EB]">
              Document Templates
            </h4>
            <p className="text-[10px] leading-relaxed text-[#6B7280] dark:text-[#94A3B8] font-semibold">
              Spin up blank specs, structured product roadmaps, or standard meeting minute layouts immediately with premium responsive typography sets.
            </p>
          </div>

          <div className="glass-card p-5 border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#0F172A] shadow-sm rounded-xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Shield size={15} />
            </div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#081B3A] dark:text-[#E5E7EB]">
              Access Roles Manager
            </h4>
            <p className="text-[10px] leading-relaxed text-[#6B7280] dark:text-[#94A3B8] font-semibold">
              Manage permission scopes and invite members. Revoke collaborator edit rights or downgrade access levels inline via interactive modals.
            </p>
          </div>

        </div>
      </main>

      {/* 4. Footer */}
      <footer className="py-6 border-t border-[#E5E7EB] dark:border-white/10 text-center text-[10px] font-bold text-[#6B7280] dark:text-[#94A3B8]/40 transition-all select-none">
        <span>&copy; 2026 CollabDocs Inc. Designed for premium collaborative SaaS workflows.</span>
      </footer>

    </div>
  );
}
