import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Star, 
  Trash2, 
  Plus, 
  Grid, 
  List, 
  Search, 
  Undo,
  MoreVertical,
  Edit2,
  Share2,
  FolderOpen
} from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/common/Button';
import ShareDocumentModal from '../../components/modals/ShareDocumentModal';
import RenameDocumentModal from '../../components/modals/RenameDocumentModal';
import { documentService } from '../../services/documentService';
import { useAuth } from '../../context/AuthContext';

export default function Documents() {
  const { user, triggerToast } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all'; // all | starred | recent | trash
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // list | grid
  const [searchQuery, setSearchQuery] = useState('');
  const [dbVer, setDbVer] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  useEffect(() => {
    // Reload items on database version change
  }, [dbVer]);

  const triggerReload = () => setDbVer(prev => prev + 1);

  // Load document list based on active filter
  const getFilteredDocs = () => {
    let list = [];
    if (filter === 'starred') {
      list = documentService.getStarred();
    } else if (filter === 'recent') {
      list = documentService.getRecent();
    } else if (filter === 'trash') {
      list = documentService.getTrash();
    } else {
      list = documentService.getAll();
    }

    if (searchQuery.trim()) {
      list = list.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  };

  const handleToggleStar = (e, docId, currentState) => {
    e.stopPropagation();
    documentService.star(docId, !currentState);
    triggerReload();
  };

  const handleMoveToTrash = (e, docId) => {
    e.stopPropagation();
    documentService.delete(docId);
    setActionMenuOpen(null);
    triggerToast('Moved to Trash', 'info');
    triggerReload();
  };

  const handleRestore = (e, docId) => {
    e.stopPropagation();
    documentService.restore(docId);
    triggerToast('Document restored', 'success');
    triggerReload();
  };

  const handleCreateDocument = () => {
    const newDoc = documentService.create('New Document', 'blank', user?.email, user?.name);
    if (newDoc) {
      triggerToast('Document created successfully!', 'success');
      navigate(`/editor/${newDoc.id}`);
    }
  };

  const openShareModal = (e, doc) => {
    e.stopPropagation();
    setSelectedDoc(doc);
    setShareOpen(true);
    setActionMenuOpen(null);
  };

  const openRenameModal = (e, doc) => {
    e.stopPropagation();
    setSelectedDoc(doc);
    setRenameOpen(true);
    setActionMenuOpen(null);
  };

  const filteredDocs = getFilteredDocs();

  return (
    <div className="min-h-screen bg-[#F7FAFF] dark:bg-[#070B14] text-[#081B3A] dark:text-[#E5E7EB] transition-colors duration-300 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'pl-44' : 'pl-12'}`}>
        <Navbar onSearchChange={setSearchQuery} />

        <main className="flex-1 p-5 md:p-6 space-y-5 max-w-7xl w-full mx-auto overflow-y-auto">
          {/* Header explorer control bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 select-none text-left border-b border-[#E5E7EB] dark:border-white/10 pb-4 transition-colors duration-300">
            <div className="space-y-1">
              <h2 className="font-sans font-extrabold text-base md:text-lg text-[#081B3A] dark:text-white uppercase tracking-wider transition-colors duration-300">
                {filter === 'trash' ? 'Trash Bin' : filter === 'starred' ? 'Starred documents' : filter === 'recent' ? 'Recent blueprints' : 'All Documents'}
              </h2>
              <p className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-bold">
                {filteredDocs.length} document{filteredDocs.length === 1 ? '' : 's'} available
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {/* Layout mode switcher */}
              <div className="flex bg-[#E5E7EB] dark:bg-[#0F172A] p-0.75 rounded-lg border border-[#E5E7EB] dark:border-white/10 shadow-sm transition-all">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-[#070B14] text-[#0D6EFD] font-bold shadow-sm' : 'text-[#6B7280]'}`}
                  title="List layout"
                >
                  <List size={12} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-[#070B14] text-[#0D6EFD] font-bold shadow-sm' : 'text-[#6B7280]'}`}
                  title="Grid layout"
                >
                  <Grid size={12} />
                </button>
              </div>

              {filter !== 'trash' && (
                <Button size="sm" onClick={handleCreateDocument} icon={Plus}>
                  New Document
                </Button>
              )}
            </div>
          </div>

          {/* Document list render */}
          {filteredDocs.length === 0 ? (
            <div className="py-24 border border-dashed border-[#E5E7EB] dark:border-white/10 rounded-2xl text-center text-xs font-semibold text-[#6B7280] dark:text-[#94A3B8]/60 transition-all select-none">
              No documents matching filters found.
            </div>
          ) : viewMode === 'list' ? (
            // LIST LAYOUT
            <div className="space-y-2 select-none text-left">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => navigate(`/editor/${doc.id}`)}
                  className="flex items-center justify-between py-2.5 px-3.5 bg-white dark:bg-[#0F172A]/40 border border-[#E5E7EB] dark:border-white/10 hover:bg-[#F7FAFF] dark:hover:bg-[#0F172A] hover:border-[#E5E7EB] dark:hover:border-white/20 rounded-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText size={14} className="text-[#0D6EFD] shrink-0" />
                    <div className="min-w-0">
                      <span className="font-semibold text-xs text-[#081B3A] dark:text-slate-200 group-hover:text-[#0D6EFD] dark:group-hover:text-white transition-colors truncate block">
                        {doc.name}
                      </span>
                      <span className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] block mt-0.5 font-medium transition-colors">
                        Owner: {doc.owner.name} • Updated {doc.updatedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 relative">
                    {filter === 'trash' ? (
                      <button
                        onClick={(e) => handleRestore(e, doc.id)}
                        className="p-1 rounded text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0D6EFD] transition-colors"
                        title="Restore"
                      >
                        <Undo size={13} />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={(e) => handleToggleStar(e, doc.id, doc.starred)}
                          className="p-1 rounded text-[#6B7280] dark:text-[#94A3B8] hover:text-amber-500 transition-colors"
                        >
                          <Star size={13} fill={doc.starred ? 'currentColor' : 'none'} className={doc.starred ? 'text-amber-500' : ''} />
                        </button>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionMenuOpen(actionMenuOpen === doc.id ? null : doc.id);
                            }}
                            className="p-1 rounded text-[#6B7280] dark:text-[#94A3B8] hover:text-[#081B3A] dark:hover:text-[#E5E7EB] hover:bg-[#E5E7EB]/40 dark:hover:bg-[#0F172A] transition-colors"
                          >
                            <MoreVertical size={13} />
                          </button>

                          {actionMenuOpen === doc.id && (
                            <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-white/10 shadow-md p-1 z-50 rounded-lg text-xs font-semibold">
                              <button
                                onClick={(e) => openRenameModal(e, doc)}
                                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-[#E5E7EB]/40 dark:hover:bg-[#070B14] text-[#081B3A] dark:text-[#E5E7EB]"
                              >
                                <Edit2 size={11} />
                                <span>Rename</span>
                              </button>
                              <button
                                onClick={(e) => openShareModal(e, doc)}
                                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-[#E5E7EB]/40 dark:hover:bg-[#070B14] text-[#081B3A] dark:text-[#E5E7EB]"
                              >
                                <Share2 size={11} />
                                <span>Share</span>
                              </button>
                              <button
                                onClick={(e) => handleMoveToTrash(e, doc.id)}
                                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 border-t border-[#E5E7EB] dark:border-white/10 mt-0.5"
                              >
                                <Trash2 size={11} />
                                <span>Trash</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // GRID LAYOUT
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 select-none text-left">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => navigate(`/editor/${doc.id}`)}
                  className="glass-card p-4 border border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#0F172A]/40 hover:bg-[#F7FAFF] dark:hover:bg-[#0F172A] hover:border-[#E5E7EB] dark:hover:border-white/20 rounded-xl transition-all duration-300 cursor-pointer space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FileText size={16} className="text-[#0D6EFD]" />
                      {filter !== 'trash' && (
                        <button
                          onClick={(e) => handleToggleStar(e, doc.id, doc.starred)}
                          className="p-1 rounded text-[#6B7280] dark:text-[#94A3B8] hover:text-amber-500 transition-colors"
                        >
                          <Star size={12} fill={doc.starred ? 'currentColor' : 'none'} className={doc.starred ? 'text-amber-500' : ''} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="font-bold text-xs text-[#081B3A] dark:text-slate-200 group-hover:text-[#0D6EFD] dark:group-hover:text-white transition-colors truncate">
                        {doc.name}
                      </h5>
                      <p className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-semibold truncate">
                        Owner: {doc.owner.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-bold text-[#6B7280] dark:text-[#94A3B8]/60 pt-2 border-t border-[#E5E7EB] dark:border-white/10 transition-colors duration-300">
                    <span>Updated {doc.updatedAt}</span>
                    {filter === 'trash' ? (
                      <button
                        onClick={(e) => handleRestore(e, doc.id)}
                        className="text-[#0D6EFD] hover:underline flex items-center gap-0.5"
                      >
                        <Undo size={10} />
                        <span>Restore</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleMoveToTrash(e, doc.id)}
                        className="text-rose-500 hover:underline flex items-center gap-0.5"
                      >
                        <Trash2 size={10} />
                        <span>Trash</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* Popups modals synchronization */}
      {selectedDoc && (
        <ShareDocumentModal
          isOpen={shareOpen}
          onClose={() => { setShareOpen(false); setSelectedDoc(null); }}
          document={selectedDoc}
          onUpdate={triggerReload}
        />
      )}

      {selectedDoc && (
        <RenameDocumentModal
          isOpen={renameOpen}
          onClose={() => { setRenameOpen(false); setSelectedDoc(null); }}
          document={selectedDoc}
          onRename={triggerReload}
        />
      )}
    </div>
  );
}
