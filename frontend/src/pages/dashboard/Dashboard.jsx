import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users2, 
  Star, 
  Plus, 
  Share2, 
  FolderOpen, 
  Settings as SettingsIcon,
  Sparkles
} from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import StatsCard from '../../components/dashboard/StatsCard';
import RecentDocuments from '../../components/dashboard/RecentDocuments';
import StorageOverview from '../../components/dashboard/StorageOverview';
import ShareDocumentModal from '../../components/modals/ShareDocumentModal';
import { documentService } from '../../services/documentService';
import { useAuth } from '../../context/AuthContext';
import { BRAND_NAME, TEMPLATES } from '../../utils/constants';

export default function Dashboard() {
  const { user, triggerToast } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [docs, setDocs] = useState([]);
  const [dbVer, setDbVer] = useState(0);

  useEffect(() => {
    // Reload database items
    setDocs(documentService.getAll());
  }, [dbVer]);

  const triggerReload = () => setDbVer(prev => prev + 1);

  // Quick category document builder
  const handleCreateFromTemplate = (templateId, templateName) => {
    const doc = documentService.create(`Draft: ${templateName}`, templateId, user?.email, user?.name);
    if (doc) {
      triggerToast(`Created from template: ${templateName}`, 'success');
      navigate(`/editor/${doc.id}`);
    }
  };

  const totalDocs = documentService.getAll().length;
  const starredDocs = documentService.getStarred().length;
  const sharedDocs = documentService.getShared(user?.email).length;
  const recentDocs = documentService.getRecent().slice(0, 5); // top 5 most recent

  return (
    <div className="min-h-screen bg-[#F7FAFF] dark:bg-[#070B14] text-[#081B3A] dark:text-[#E5E7EB] transition-colors duration-300 flex">
      {/* 1. Sidebar Nav */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* 2. Main content wrapper */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300
          ${sidebarOpen ? 'pl-44' : 'pl-12'}
        `}
      >
        <Navbar onSearchChange={null} />

        <main className="flex-1 p-5 md:p-6 space-y-6 max-w-7xl w-full mx-auto overflow-y-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 select-none text-left">
            <div className="space-y-1">
              <h2 className="font-sans font-extrabold text-base md:text-lg text-[#081B3A] dark:text-white uppercase tracking-wider transition-colors duration-300">
                Welcome back, {user?.name || 'Partner'} 👋
              </h2>
              <p className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-bold">
                Launch drafts or co-author specs in real-time.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold rounded-full uppercase tracking-wider">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>Workspace Active</span>
            </div>
          </div>

          {/* Quick templates grid */}
          <div className="space-y-2 select-none text-left">
            <h4 className="text-[10px] font-bold text-[#6B7280] dark:text-[#94A3B8] uppercase tracking-wider">
              Start new document
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {TEMPLATES.map((temp) => (
                <div
                  key={temp.id}
                  onClick={() => handleCreateFromTemplate(temp.id, temp.name)}
                  className="glass-card p-3 border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#0F172A]/40 hover:bg-[#F7FAFF] dark:hover:bg-[#0F172A] hover:border-[#E5E7EB] dark:hover:border-white/20 rounded-xl transition-all duration-300 cursor-pointer text-left space-y-1.5 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Plus size={14} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[11px] text-[#081B3A] dark:text-[#E5E7EB] transition-colors">{temp.name}</h5>
                    <p className="text-[9px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5 font-semibold transition-colors">{temp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard title="Total Documents" value={totalDocs} icon={FileText} />
            <StatsCard title="Starred Documents" value={starredDocs} icon={Star} bgAccent="bg-amber-500/10" textAccent="text-amber-500" />
            <StatsCard title="Shared with me" value={sharedDocs} icon={Users2} bgAccent="bg-emerald-500/10" textAccent="text-emerald-500" />
          </div>

          {/* Main workspace splits */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left 2/3: Recent Documents */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-white/10 pb-1.5 transition-colors duration-300">
                <h4 className="font-sans font-bold text-[10px] text-[#6B7280] dark:text-[#94A3B8] uppercase tracking-wider">
                  Recent documents
                </h4>
                <button
                  onClick={() => navigate('/documents')}
                  className="text-[9px] font-bold text-[#0D6EFD] hover:text-[#0D6EFD]/80 flex items-center gap-0.5 transition-colors"
                >
                  <span>Browse all docs →</span>
                </button>
              </div>
              <RecentDocuments documents={recentDocs} onUpdate={triggerReload} />
            </div>

            {/* Right 1/3: Storage */}
            <div className="space-y-4 lg:pl-2">
              <StorageOverview />
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
