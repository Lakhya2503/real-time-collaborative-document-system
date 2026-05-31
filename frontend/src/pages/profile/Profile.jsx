import React, { useState } from 'react';
import { User, ShieldAlert, Award, FolderEdit } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { documentService } from '../../services/documentService';

export default function Profile() {
  const { user, triggerToast } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || 'Editor');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    triggerToast('Profile updated successfully!', 'success');
    setIsEditing(false);
  };

  const totalDocsCount = documentService.getAll().length;

  return (
    <div className="min-h-screen bg-[#F7FAFF] dark:bg-[#070B14] text-[#081B3A] dark:text-[#E5E7EB] transition-colors duration-300 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'pl-44' : 'pl-12'}`}>
        <Navbar />

        <main className="flex-1 p-5 md:p-6 space-y-6 max-w-4xl w-full mx-auto overflow-y-auto">
          {/* Header */}
          <div className="text-left border-b border-[#E5E7EB] dark:border-white/10 pb-4 transition-all duration-300 select-none">
            <h2 className="font-sans font-extrabold text-base md:text-lg text-[#081B3A] dark:text-white uppercase tracking-wider">
              My Profile
            </h2>
            <p className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-bold mt-1">
              Manage your security credentials and personal workspaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* Left: Avatar Details Card */}
            <div className="glass-card p-5 border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#0F172A] shadow-sm rounded-2xl text-center space-y-4 transition-all duration-300 select-none">
              <div className="relative w-16 h-16 mx-auto">
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256'} 
                  alt={user?.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#0D6EFD]"
                />
              </div>

              <div className="space-y-1">
                <h4 className="font-sans font-extrabold text-sm text-[#081B3A] dark:text-[#E5E7EB] truncate transition-colors">
                  {name}
                </h4>
                <p className="text-[10px] text-[#6B7280] dark:text-[#94A3B8]/60 font-semibold truncate transition-colors">
                  {user?.email}
                </p>
              </div>

              <div className="flex justify-center gap-1.5 pt-1.5 border-t border-[#E5E7EB] dark:border-white/10 transition-colors duration-300">
                <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-[#0D6EFD]/10 text-[#0D6EFD] font-bold">
                  <Award size={10} />
                  <span>{role}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                  <FolderEdit size={10} />
                  <span>{totalDocsCount} Docs</span>
                </span>
              </div>
            </div>

            {/* Right 2/3: Profile Settings Form */}
            <div className="md:col-span-2 glass-card p-5 border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#0F172A] shadow-sm rounded-2xl text-left transition-all duration-300">
              <h4 className="text-[10px] font-bold text-[#6B7280] dark:text-[#94A3B8] uppercase tracking-wider border-b border-[#E5E7EB] dark:border-white/10 pb-2 mb-4 transition-colors">
                Personal details
              </h4>

              <form onSubmit={handleSave} className="space-y-4">
                <Input
                  label="Display Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  required
                />

                <Input
                  label="Registered Email Address"
                  type="email"
                  value={user?.email || ''}
                  disabled
                />

                <div className="flex flex-col gap-1 w-full text-left">
                  <label className="text-[10px] font-bold text-[#6B7280] dark:text-[#94A3B8] uppercase tracking-wider">Workspace Role Scope</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#070B14] text-[#081B3A] dark:text-[#E5E7EB] focus:outline-none focus:ring-1 focus:ring-[#0D6EFD] shadow-sm transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <option value="Admin">Admin (Full access)</option>
                    <option value="Editor">Editor (Shared authoring)</option>
                    <option value="Viewer">Viewer (Read-only)</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => { setIsEditing(false); setName(user?.name); }}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary">
                        Save changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} icon={User}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </form>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
