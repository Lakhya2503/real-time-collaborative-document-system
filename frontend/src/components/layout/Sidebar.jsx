import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users2, 
  Star, 
  Clock, 
  Trash2, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { BRAND_NAME } from '../../utils/constants';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'All Documents', path: '/documents', icon: FileText },
    { name: 'Shared with me', path: '/shared', icon: Users2 },
    { name: 'Starred', path: '/documents?filter=starred', icon: Star },
    { name: 'Recent', path: '/documents?filter=recent', icon: Clock },
    { name: 'Trash', path: '/documents?filter=trash', icon: Trash2 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <aside 
      className={`glass-panel fixed top-0 left-0 h-full z-40 flex flex-col justify-between transition-all duration-300 border-r border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#0B1220]
        ${sidebarOpen ? 'w-44' : 'w-12'}
      `}
    >
      <div>
        {/* Header Branding */}
        <div className="h-12 flex items-center justify-between px-3.5 border-b border-[#E5E7EB] dark:border-white/10 transition-colors duration-300">
          <div className="flex items-center gap-2 overflow-hidden select-none">
            <div className="text-[#0D6EFD] shrink-0">
              <FolderOpen size={16} />
            </div>
            {sidebarOpen && (
              <span className="font-sans font-bold text-xs text-[#081B3A] dark:text-[#E5E7EB] tracking-tight transition-colors duration-300">
                {BRAND_NAME}
              </span>
            )}
          </div>

          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.25 rounded text-[#6B7280] dark:text-[#94A3B8] hover:text-[#081B3A] dark:hover:text-[#E5E7EB] hover:bg-[#E5E7EB]/40 dark:hover:bg-[#0F172A] transition-colors duration-300"
          >
            {sidebarOpen ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="mt-2.5 px-1.5 space-y-0.75 select-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Exact active match for custom search queries
            const isActive = currentPath === item.path || 
                             (item.path.includes('?') && currentPath.startsWith(item.path.split('?')[0]) && currentPath.includes(item.path.split('?')[1]));
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition-all duration-300 group relative
                  ${isActive 
                    ? 'bg-[#0D6EFD]/10 text-[#0D6EFD] shadow-sm dark:shadow-none border border-[#0D6EFD]/20 dark:border-transparent' 
                    : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#081B3A] dark:hover:text-[#E5E7EB] hover:bg-[#E5E7EB]/40 dark:hover:bg-[#0F172A]/30 border border-transparent'
                  }
                `}
              >
                <Icon 
                  size={14} 
                  className={`shrink-0 transition-colors duration-300
                    ${isActive ? 'text-[#0D6EFD]' : 'text-[#6B7280] dark:text-[#94A3B8]/80 group-hover:text-[#081B3A] dark:group-hover:text-[#E5E7EB]'}
                  `}
                />
                
                {sidebarOpen ? (
                  <span className="truncate">{item.name}</span>
                ) : (
                  /* Collapsed state item tooltip */
                  <span className="absolute left-9 bg-[#070B14] text-white text-[9px] px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Profile/Footer Indicator */}
      {sidebarOpen && (
        <div className="p-3.5 border-t border-[#E5E7EB] dark:border-white/10 flex items-center justify-center text-[10px] font-semibold text-[#6B7280] dark:text-[#94A3B8]/40 select-none">
          <span>v1.0.0 Stable</span>
        </div>
      )}
    </aside>
  );
}
