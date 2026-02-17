# Visualyn Codebase Snapshot

Generated on: 2026-02-17T06:28:37.233Z

## File: components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}

```

## File: eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

```

## File: index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>visualyn-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

## File: jsconfig.json

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
    }
}
```

## File: package.json

```json
{
  "name": "visualyn-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "sync:notebook": "node scripts/generate_snapshot.cjs"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@supabase/supabase-js": "^2.93.3",
    "@tailwindcss/postcss": "^4.1.18",
    "autoprefixer": "^10.4.24",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.563.0",
    "postcss": "^8.5.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.0",
    "tailwind-merge": "^3.4.1",
    "tailwindcss": "^4.1.18",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```

## File: postcss.config.js

```js
export default {
    plugins: {
        "@tailwindcss/postcss": {},
    },
}

```

## File: src\App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## File: src\App.jsx

```jsx
﻿import React, { useState, useRef, useEffect } from 'react';
import {
  Menu, X, RefreshCw, Zap, PanelLeft, Loader2, Check, Rocket, CalendarClock,
  ImageIcon, CornerDownRight, Plus, MessageSquare, Clock, LayoutGrid, Share2,
  Wand2, Cloud, BookOpen, Settings, LogOut, Search, Calendar, Filter,
  Command, Bell, User, Star, Trash2, CheckCircle, Film, Palette, Stamp,
  Send, Smartphone, Activity, Hash, Edit2, Tag, HelpCircle
} from 'lucide-react';
import { useAuth, AuthForm } from './components/Auth.jsx';
import { ConnectTikTokButton } from './components/SocialPublish.jsx';
import { fetchAssets, uploadAsset, postMedia, signOut as supabaseSignOut } from './lib/supabase';
import VisualynLogo from './assets/Visualyn.png';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"


// --- HELPER COMPONENTS ---
// (SidebarItem removed as we now use official AppSidebar)

const App = () => {

  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('portfolio');
  const [activeFolderId, setActiveFolderId] = useState('root');
  const [aiTokens, setAiTokens] = useState(20);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Auth
  const { user, loading: authLoading, signOut } = useAuth();

  // Folders & Assets
  const [folders, setFolders] = useState([
    { id: 'root', name: 'Semua Aset' },
    { id: 'f1', name: 'Project Alpha' },
    { id: 'f2', name: 'Street Photography' }
  ]);

  const [items, setItems] = useState([]);

  // Fetch items from database
  useEffect(() => {
    if (user) {
      const loadAssets = async () => {
        const assets = await fetchAssets();
        if (assets && assets.length > 0) {
          setItems(assets);
        }
      };
      loadAssets();
    }
  }, [user]);

  // Testimonials State
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      price: "Rp 15.000.000",
      rating: 5,
      date: "2023-11-20",
      type: "Motion",
      template: "Telegram Channel",
      response: "Terima kasih Mas Budi! Ditunggu next project-nya ya 🔥",
      imgUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800'
    },
    {
      id: 2,
      name: "Siti Aminah",
      price: "Rp 8.500.000",
      rating: 4,
      date: "2023-12-05",
      type: "Design",
      template: "WhatsApp Channel",
      response: "",
      imgUrl: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=800'
    }
  ]);

  // Sync History State
  const [syncHistory, setSyncHistory] = useState([
    { id: 1, action: "Upload", file: "Cinematic Street.jpg", time: "2 min lalu", status: "Success" },
    { id: 2, action: "Sync", file: "Project Alpha Folder", time: "1 jam lalu", status: "Success" },
    { id: 3, action: "Delete", file: "Old_draft_v1.png", time: "3 jam lalu", status: "Completed" }
  ]);

  // Form Testimoni
  const [selectedTestiAssetIds, setSelectedTestiAssetIds] = useState([]);
  const [testiForm, setTestiForm] = useState({
    name: '', price: '', rating: 5, date: '', type: 'Motion', template: 'Telegram Channel', response: ''
  });

  // Social & Editing
  const [selectedSocialIds, setSelectedSocialIds] = useState([]);
  const [socialForm, setSocialForm] = useState({
    platform: 'instagram', caption: '', scheduleDate: '', scheduleTime: '', autoSchedule: false, intervalHours: 2
  });
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  // Tools
  const [toolImage, setToolImage] = useState(null);
  const [palette, setPalette] = useState([]);
  const [watermark, setWatermark] = useState(false);

  // --- HANDLERS ---
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const newLog = {
        id: Date.now(),
        action: "Manual Sync",
        file: `${items.length} items checked`,
        time: "Baru saja",
        status: "Success"
      };
      setSyncHistory([newLog, ...syncHistory]);
    }, 1500);
  };

  // Handler for file upload in Workspace
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadAsset(file));
      const newAssets = await Promise.all(uploadPromises);
      setItems(prev => [...newAssets, ...prev]);
      const newLog = {
        id: Date.now(),
        action: "Upload",
        file: `${files.length} items`,
        time: "Baru saja",
        status: "Success"
      };
      setSyncHistory([newLog, ...syncHistory]);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload gagal. Pastikan storage bucket 'assets' dan 'videos' sudah ada.");
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleToggleTestiSelection = (id) => {
    setSelectedTestiAssetIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleAddTestimonial = () => {
    if (selectedTestiAssetIds.length === 0) return alert("Pilih minimal 1 gambar bukti testimoni!");
    if (!testiForm.name || !testiForm.price || !testiForm.date) return alert("Lengkapi data form!");

    const newTestis = selectedTestiAssetIds.map(id => {
      const asset = items.find(i => i.id === id);
      return {
        ...testiForm,
        id: Date.now() + Math.random(),
        imgUrl: asset?.url
      };
    });

    setTestimonials([...newTestis, ...testimonials]);
    setTestiForm({ ...testiForm, name: '', price: '', rating: 5, date: '', response: '' });
    setSelectedTestiAssetIds([]);
    alert(`${newTestis.length} Testimoni berhasil diterbitkan!`);
  };

  const handleToggleSelection = (id) => {
    setSelectedSocialIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleUploadNow = async () => {
    if (selectedSocialIds.length === 0) return alert("Pilih aset!");

    setIsSyncing(true);
    try {
      for (const id of selectedSocialIds) {
        const item = items.find(i => i.id === id);
        if (!item) continue;

        await postMedia(socialForm.caption || "Check out my new work!", item.url, [socialForm.platform]);

        const newPost = {
          id: Math.random(),
          item: item,
          platform: socialForm.platform,
          status: 'published',
          time: new Date().toLocaleTimeString()
        };
        setScheduledPosts(prev => [newPost, ...prev]);
      }
      setSelectedSocialIds([]);
      alert("Konten berhasil di-publish ke social media!");
    } catch (err) {
      console.error("Publish error:", err);
      alert(`Gagal publish: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSchedule = () => {
    if (selectedSocialIds.length === 0) return alert("Pilih aset!");
    const newPosts = selectedSocialIds.map((id, idx) => {
      const baseTime = new Date();
      if (socialForm.autoSchedule) baseTime.setHours(baseTime.getHours() + (idx * socialForm.intervalHours));
      return {
        id: Math.random(),
        item: items.find(i => i.id === id),
        platform: socialForm.platform,
        status: 'scheduled',
        time: baseTime.toLocaleTimeString()
      };
    });
    setScheduledPosts(prev => [...newPosts, ...prev]);
    setSelectedSocialIds([]);
    alert("Bulk Schedule Berhasil!");
  };

  const generateAI = () => {
    if (aiTokens <= 0) return alert("Token habis!");
    setIsGeneratingCaption(true);
    setTimeout(() => {
      setAiTokens(t => t - 1);
      setSocialForm(f => ({ ...f, caption: "Elevate your visuals with Visualyn. 🚀 #aesthetic #pro" }));
      setIsGeneratingCaption(false);
    }, 800);
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && tagInput.trim() && editingItem) {
      if (!editingItem.tags.includes(tagInput.trim())) {
        setEditingItem({ ...editingItem, tags: [...editingItem.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  // --- AUTH CONDITIONALS ---
  if (authLoading) return <div className="min-h-screen bg-[var(--bg-darkest)] flex items-center justify-center"><Loader2 className="animate-spin text-lime-500" /></div>;
  if (!user) return <AuthForm />;

  const { email } = user;

  // --- UI RENDER ---
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full bg-[var(--bg-darkest)]">
        {/* Top Navbar Component - Now Full Width */}
        <header className="h-16 flex items-center px-6 justify-between navbar-glass sticky top-0 z-[110] shrink-0 w-full border-b border-white/5">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-slate-400 hover:text-lime-400 transition-colors" />
            <div className="h-6 w-px bg-white/10 mx-1" />

            <div className="flex items-center gap-4">
              <div className="logo-container w-9 h-9 flex items-center justify-center">
                <img src={VisualynLogo} alt="Visualyn Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
              </div>
              <span className="font-black text-xl bg-gradient-to-r from-white via-white to-lime-400 bg-clip-text text-transparent tracking-tighter">Visualyn</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="token-badge px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2">
              <Zap size={12} className={aiTokens < 5 ? 'text-red-400' : 'text-lime-400'} />
              <span className="text-slate-400 uppercase tracking-widest hidden xs:inline">AI Token:</span>
              <span className={aiTokens < 5 ? 'text-red-400' : 'text-white font-mono'}>{aiTokens}/20</span>
            </div>
            <button onClick={handleTriggerSync} className="text-[10px] font-black text-black bg-lime-500 px-4 py-2 rounded-full hover:bg-lime-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center gap-2">
              <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
              <span className="hidden xs:inline uppercase">{isSyncing ? 'Syncing...' : 'Sync'}</span>
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <AppSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} signOut={signOut} />
          <SidebarInset className="bg-[var(--bg-darkest)] flex flex-col flex-1 overflow-y-auto custom-scrollbar">
            <main className="p-4 md:p-6">

              {/* Portfolio Tab */}
              {activeTab === 'portfolio' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white">My Workspace</h2>
                      <p className="text-slate-500 text-sm mt-1">Kelola aset visual Anda dengan cerdas.</p>
                    </div>
                    <div>
                      <input
                        type="file"
                        id="workspaceUpload"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => document.getElementById('workspaceUpload').click()}
                        className="bg-lime-500 text-black px-4 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
                      >
                        <Plus size={16} /> Upload New
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map(item => (
                      <div key={item.id} onClick={() => { setEditingItem(item); setIsEditModalOpen(true) }} className="group bg-[#161b22] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-lime-500/50 transition-all">
                        <div className="aspect-square relative overflow-hidden">
                          <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                          <div className="absolute bottom-2 left-2 flex gap-1">
                            {item.tags.map(t => <span key={t} className="text-[8px] bg-black/60 px-1.5 py-0.5 rounded border border-white/10 uppercase font-bold tracking-wider">#{t}</span>)}
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm font-bold truncate text-slate-200">{item.title}</h4>
                          <p className="text-[10px] text-slate-500 mt-1">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Tab */}
              {activeTab === 'social' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
                  <div className="lg:col-span-2 space-y-6">
                    <ConnectTikTokButton />
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h3 className="font-bold mb-4 flex items-center gap-2">Pilih Aset (Bulk: {selectedSocialIds.length})</h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                        {items.map(item => (
                          <div
                            key={item.id}
                            onClick={() => handleToggleSelection(item.id)}
                            className={`w-24 h-24 rounded-xl flex-shrink-0 border-2 transition-all relative cursor-pointer overflow-hidden ${selectedSocialIds.includes(item.id) ? 'border-lime-500 ring-4 ring-lime-500/10' : 'border-transparent opacity-60 hover:opacity-100'}`}
                          >
                            <img src={item.url} className="w-full h-full object-cover" alt="thumb" />
                            {selectedSocialIds.includes(item.id) && <div className="absolute top-1 right-1 bg-lime-500 text-black p-0.5 rounded-full"><Check size={10} strokeWidth={4} /></div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">Platform</label>
                          <select onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })} className="w-full bg-black/40 border border-white/10 p-2.5 rounded-lg text-sm text-white focus:border-lime-500 outline-none">
                            <option value="tiktok">TikTok</option>
                            <option value="instagram">Instagram</option>
                            <option value="twitter">X / Twitter</option>
                            <option value="facebook">Facebook</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">Tanggal</label>
                          <input type="date" className="w-full bg-black/40 border border-white/10 p-2 rounded-lg text-sm text-white focus:border-lime-500 outline-none" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={handleUploadNow} className="bg-white text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"><Rocket size={18} /> Upload Now</button>
                        <button onClick={handleSchedule} className="bg-lime-500 text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-lime-400 transition-all"><CalendarClock size={18} /> Bulk Schedule</button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10 h-fit">
                      <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Clock size={16} /> Queue Status</h3>
                      <div className="space-y-3">
                        {scheduledPosts.length === 0 && <p className="text-xs text-slate-600 text-center py-10 italic">Belum ada antrean.</p>}
                        {scheduledPosts.map(p => (
                          <div key={p.id} className="p-3 bg-black/20 rounded-xl flex gap-3 items-center border border-white/5">
                            <img src={p.item?.url} className="w-10 h-10 rounded object-cover" />
                            <div className="flex-1 truncate">
                              <p className="text-[10px] font-bold text-lime-400 uppercase">{p.platform}</p>
                              <p className="text-[10px] text-slate-500">{p.time} • {p.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Testimonials Tab */}
              {activeTab === 'testimonials' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
                  {/* Kiri: Selector & Form */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* 1. Selector Gambar (Bulk) */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-white flex items-center gap-2"><ImageIcon size={18} className="text-lime-400" /> Pilih Bukti Testimoni</h3>
                        {selectedTestiAssetIds.length > 0 && <span className="text-[10px] bg-lime-500/10 text-lime-400 px-2 py-1 rounded border border-lime-500/20 font-bold">Bulk: {selectedTestiAssetIds.length} Selected</span>}
                      </div>
                      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                        {items.map(item => (
                          <div
                            key={item.id}
                            onClick={() => handleToggleTestiSelection(item.id)}
                            className={`w-28 h-28 rounded-xl flex-shrink-0 border-2 transition-all relative cursor-pointer overflow-hidden group ${selectedTestiAssetIds.includes(item.id) ? 'border-lime-500 ring-4 ring-lime-500/10' : 'border-transparent opacity-60 hover:opacity-100'}`}
                          >
                            <img src={item.url} className="w-full h-full object-cover" alt="thumb" />
                            {selectedTestiAssetIds.includes(item.id) && <div className="absolute top-1 right-1 bg-lime-500 text-black p-0.5 rounded-full"><Check size={12} strokeWidth={4} /></div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Form Detail */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                      <h3 className="font-bold text-white flex items-center gap-2 mb-2"><MessageSquare size={18} className="text-blue-400" /> Detail Testimoni</h3>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Nama Klien (Akan sama untuk bulk)</label>
                        <input
                          placeholder="Contoh: Budi Santoso"
                          value={testiForm.name}
                          onChange={(e) => setTestiForm({ ...testiForm, name: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-lime-500 outline-none"
                        />
                      </div>

                      {/* Jenis Testimoni & Template Upload */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Jenis Layanan</label>
                          <select
                            value={testiForm.type}
                            onChange={(e) => setTestiForm({ ...testiForm, type: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-lime-500 outline-none"
                          >
                            <option value="Motion">Motion</option>
                            <option value="Design">Design</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-lime-400 uppercase block mb-1">Template Upload</label>
                          <select
                            value={testiForm.template}
                            onChange={(e) => setTestiForm({ ...testiForm, template: e.target.value })}
                            className="w-full bg-lime-500/10 border border-lime-500/30 rounded-xl p-3 text-sm text-lime-400 focus:border-lime-500 outline-none font-medium"
                          >
                            <option value="Telegram Channel">Telegram Channel</option>
                            <option value="WhatsApp Channel">WhatsApp Channel</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Tanggal</label>
                        <input
                          type="date"
                          value={testiForm.date}
                          onChange={(e) => setTestiForm({ ...testiForm, date: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-lime-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Price / Nominal</label>
                        <input
                          type="text"
                          placeholder="Contoh: Rp 5.000.000"
                          value={testiForm.price}
                          onChange={(e) => setTestiForm({ ...testiForm, price: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-lime-400 outline-none font-mono"
                        />
                      </div>

                      {/* Seller Response Box */}
                      <div className="bg-lime-500/5 p-3 rounded-xl border border-lime-500/10">
                        <label className="text-[10px] font-bold text-lime-400 uppercase block mb-1 flex items-center gap-1"><CornerDownRight size={10} /> Tanggapan Penjual</label>
                        <textarea
                          placeholder="Tulis balasan atau ucapan terima kasih untuk klien..."
                          value={testiForm.response}
                          onChange={(e) => setTestiForm({ ...testiForm, response: e.target.value })}
                          className="w-full bg-black/20 border border-lime-500/20 rounded-lg p-3 text-sm h-16 focus:border-lime-400 outline-none resize-none placeholder-slate-600 text-lime-100"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star
                              key={s}
                              size={20}
                              onClick={() => setTestiForm({ ...testiForm, rating: s })}
                              className={`cursor-pointer transition-transform hover:scale-110 ${s <= testiForm.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={handleAddTestimonial}
                          className="bg-lime-500 text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-lime-400 transition-all flex items-center gap-2 shadow-lg shadow-lime-900/20"
                        >
                          <Upload size={16} /> {selectedTestiAssetIds.length > 1 ? `Publish ${selectedTestiAssetIds.length} Testis` : 'Publish Testimonial'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Kanan: List Card Testimoni */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                      <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Activity size={18} className="text-lime-400" /> Testimoni Terbit ({testimonials.length})</h3>

                      <div className="space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar pr-2">
                        {testimonials.map(t => (
                          <div key={t.id} className="bg-[#161b22] rounded-2xl border border-white/5 overflow-hidden group relative hover:border-lime-500/30 transition-all">
                            {/* Gambar Bukti */}
                            <div className="h-32 w-full relative bg-slate-900 overflow-hidden">
                              <img src={t.imgUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Bukti" />
                              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white border border-white/10 flex items-center gap-1">
                                <Calendar size={10} /> {t.date}
                              </div>
                              <div className="absolute top-2 right-2 bg-lime-500 text-black px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                                {t.type === 'Motion' && <Film size={10} />}
                                {t.type === 'Design' && <Palette size={10} />}
                                {t.type === 'Other' && <Hash size={10} />}
                                {t.type}
                              </div>
                            </div>

                            {/* Konten */}
                            <div className="p-4 relative">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-0.5">
                                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
                                </div>
                                {/* Badge Template */}
                                <div className="text-[8px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded border border-white/5 flex items-center gap-1">
                                  {t.template.includes('Telegram') ? <Send size={8} /> : <Smartphone size={8} />}
                                  {t.template.split(' ')[0]}
                                </div>
                              </div>

                              <p className="text-sm font-bold text-lime-400 mb-2 font-mono">{t.price}</p>

                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center font-bold text-[10px] text-white">
                                  {t.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-white">{t.name}</p>
                                </div>
                              </div>

                              {/* Seller Response Display */}
                              {t.response && (
                                <div className="mt-3 bg-white/5 p-3 rounded-lg border border-white/5 text-xs">
                                  <p className="text-[10px] font-bold text-lime-400 mb-1 flex items-center gap-1"><CornerDownRight size={10} /> Seller Response:</p>
                                  <p className="text-slate-300 italic">"{t.response}"</p>
                                </div>
                              )}

                              <button
                                onClick={() => setTestimonials(testimonials.filter(item => item.id !== t.id))}
                                className="absolute top-36 right-4 text-slate-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 bg-black/50 p-1.5 rounded-full"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sync Portfolio Tab */}
              {activeTab === 'sync' && (
                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
                  {/* Status Card */}
                  <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900 border border-emerald-500/20 p-8 rounded-2xl flex items-center justify-between shadow-lg">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">Status Sinkronisasi</h2>
                      <p className="text-emerald-400 text-sm flex items-center gap-2">
                        <CheckCircle size={14} /> Terhubung ke Cloud Storage (Asia-Pacific)
                      </p>
                      <p className="text-slate-400 text-xs mt-2">Terakhir sinkronisasi: {syncHistory[0]?.time || '-'}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-mono font-bold text-white">1.4 GB</div>
                      <div className="text-slate-500 text-xs uppercase tracking-wide">/ 15 GB Used</div>
                      <div className="w-32 h-1.5 bg-slate-700 rounded-full mt-2 ml-auto overflow-hidden">
                        <div className="h-full bg-lime-500 w-[10%]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Actions */}
                    <div className="md:col-span-1 space-y-4">
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                        <h3 className="font-bold text-white mb-4">Quick Actions</h3>
                        <button onClick={handleTriggerSync} disabled={isSyncing} className="w-full bg-lime-500/10 hover:bg-lime-500/20 text-lime-400 border border-lime-500/30 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mb-3">
                          <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} /> {isSyncing ? "Syncing..." : "Sync Sekarang"}
                        </button>
                        <p className="text-[10px] text-slate-500 text-center mb-4">Menyinkronkan semua folder & aset ke cloud.</p>

                        {/* Platform Sync Buttons */}
                        <div className="space-y-2">
                          <button onClick={() => alert('Syncing to LinkedIn...')} className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                            <Globe size={14} /> Sync to LinkedIn
                          </button>
                          <button onClick={() => alert('Syncing to Dribbble...')} className="w-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/30 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                            <Palette size={14} /> Sync to Dribbble
                          </button>
                          <button onClick={() => alert('Syncing to Own Web...')} className="w-full bg-lime-500/10 hover:bg-lime-500/20 text-lime-400 border border-lime-500/30 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                            <HardDrive size={14} /> Sync to Own Web
                          </button>
                        </div>
                      </div>
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                        <h3 className="font-bold text-white mb-2">Auto-Sync</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Status</span>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Active</span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Log */}
                    <div className="md:col-span-2">
                      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                        <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                          <h3 className="font-bold text-white flex items-center gap-2"><Activity size={18} className="text-blue-400" /> Riwayat Aktivitas</h3>
                        </div>
                        <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                          {syncHistory.map(log => (
                            <div key={log.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                              <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${log.action === 'Upload' ? 'bg-blue-500/10 text-blue-400' : log.action === 'Delete' ? 'bg-red-500/10 text-red-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                  {log.action === 'Upload' ? <Upload size={16} /> : log.action === 'Delete' ? <Trash2 size={16} /> : <RefreshCw size={16} />}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-200 text-xs">{log.action}</div>
                                  <div className="text-[10px] text-slate-500">{log.file}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] font-bold text-emerald-400 uppercase">{log.status}</div>
                                <div className="text-[9px] text-slate-600">{log.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tools Tab */}
              {activeTab === 'tools' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                  <div className="bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center p-8 min-h-[400px] relative">
                    {toolImage ? (
                      <>
                        <img src={toolImage.url} className={`max-h-[60vh] rounded shadow-2xl ${watermark ? 'brightness-75' : ''}`} alt="Tools Preview" />
                        {watermark && <div className="absolute bottom-12 right-12 text-white/30 font-bold text-3xl rotate-[-25deg] select-none border-2 border-white/20 p-2">VISUALYN</div>}
                        <button onClick={() => { setToolImage(null); setPalette([]) }} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"><X size={16} /></button>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="text-slate-500 text-sm mb-4">Pilih gambar untuk diedit</p>
                        <div className="flex gap-2 justify-center">
                          {items.map(i => <img key={i.id} src={i.url} onClick={() => setToolImage(i)} className="w-16 h-16 rounded object-cover cursor-pointer hover:ring-2 ring-lime-500 opacity-60 hover:opacity-100 transition-all" />)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><Palette size={18} className="text-pink-400" /> AI Palette Extractor</h3>
                      <button onClick={() => setPalette(['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#F7FFF7'])} disabled={!toolImage} className="w-full bg-pink-500/10 text-pink-400 border border-pink-500/20 py-2 rounded-lg font-bold text-sm mb-4 disabled:opacity-50">Generate Palette</button>
                      <div className="flex h-12 rounded-xl overflow-hidden shadow-2xl">
                        {palette.map(c => <div key={c} style={{ backgroundColor: c }} className="flex-1 hover:flex-[1.5] transition-all cursor-pointer" onClick={() => alert(c)}></div>)}
                      </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><Stamp size={18} className="text-blue-400" /> Instant Watermark</h3>
                      <button onClick={() => setWatermark(!watermark)} disabled={!toolImage} className={`w-full py-2 rounded-lg font-bold text-sm transition-all ${watermark ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                        {watermark ? 'Watermark Applied' : 'Terapkan Watermark'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Docs Tab */}
              {activeTab === 'docs' && (
                <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-left-4 duration-300 pb-20">

                  {/* Header */}
                  <div className="bg-gradient-to-r from-lime-900/40 to-slate-900 border-l-4 border-lime-500 p-8 rounded-r-2xl">
                    <h1 className="text-4xl font-bold text-white mb-2">Visualyn User Guide</h1>
                    <p className="text-lime-400 font-medium text-lg italic">Pusat Bantuan & Dokumentasi Lengkap</p>
                    <p className="text-slate-400 mt-2 text-sm max-w-2xl">
                      Selamat datang di Visualyn, platform manajemen aset visual all-in-one. Panduan ini mencakup semua fitur mulai dari manajemen workspace hingga sistem testimoni canggih.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* 1. Workspace */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 hover:border-lime-500/30 transition-all">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><LayoutGrid size={20} /></div>
                        Workspace
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex gap-2">
                          <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                          <span><strong>Upload & Organize:</strong> Unggah aset visual dan kelompokkan dalam folder proyek.</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                          <span><strong>Metadata Editor:</strong> Klik gambar untuk edit judul dan tambah <strong>Tags</strong> (tekan Enter). Tag memudahkan pencarian.</span>
                        </li>
                      </ul>
                    </div>

                    {/* 2. Social Publish */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 hover:border-lime-500/30 transition-all">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400"><Share2 size={20} /></div>
                        Social Publish
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex gap-2">
                          <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                          <span><strong>Bulk Selection:</strong> Pilih banyak gambar sekaligus untuk dijadwalkan.</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                          <span><strong>Auto-Schedule:</strong> Aktifkan fitur ini untuk otomatis memberi jeda waktu (misal: 2 jam) antar postingan.</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                          <span><strong>AI Caption:</strong> Gunakan token AI untuk membuat caption menarik secara instan.</span>
                        </li>
                      </ul>
                    </div>

                    {/* 3. Testimonials Manager */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 hover:border-lime-500/30 transition-all md:col-span-2">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><MessageSquare size={20} /></div>
                        Testimonials Manager <span className="text-xs bg-lime-500 text-black px-2 py-0.5 rounded-full font-bold ml-2">NEW</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-400">
                        <ul className="space-y-3">
                          <li className="flex gap-2">
                            <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                            <span><strong>Bulk Upload Proof:</strong> Pilih banyak screenshot chat sekaligus sebagai bukti testimoni.</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                            <span><strong>Template Channel:</strong> Format khusus untuk broadcast ke <strong>Telegram</strong> atau <strong>WhatsApp Channel</strong>.</span>
                          </li>
                        </ul>
                        <ul className="space-y-3">
                          <li className="flex gap-2">
                            <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                            <span><strong>Seller Response:</strong> Tambahkan balasan/ucapan terima kasih personal yang akan tampil di kartu testimoni.</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                            <span><strong>Price Tag:</strong> Tampilkan nilai proyek (Rp) agar lebih kredibel.</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* 4. Creative Tools */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 hover:border-lime-500/30 transition-all">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Wand2 size={20} /></div>
                        Creative Tools
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex gap-2">
                          <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                          <span><strong>Palette Extractor:</strong> Ambil 5 warna dominan dari gambar untuk referensi desain.</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                          <span><strong>Instant Watermark:</strong> Lindungi karya Anda dengan watermark otomatis sekali klik.</span>
                        </li>
                      </ul>
                    </div>

                    {/* 5. Sync System */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 hover:border-lime-500/30 transition-all">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><Cloud size={20} /></div>
                        Sync System
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex gap-2">
                          <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                          <span><strong>Cloud Storage:</strong> Pantau penggunaan kapasitas penyimpanan Anda (Max 15GB).</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                          <span><strong>Activity Log:</strong> Riwayat lengkap aktivitas upload, delete, dan sync tercatat rapi.</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                  {/* Footer Help */}
                  <div className="bg-slate-900/50 border border-white/5 p-6 rounded-xl text-center">
                    <h4 className="text-white font-bold mb-2 flex items-center justify-center gap-2"><HelpCircle size={18} /> Masih butuh bantuan?</h4>
                    <p className="text-sm text-slate-500 mb-4">Tim support kami siap membantu 24/7 untuk masalah teknis.</p>
                    <div className="flex justify-center gap-3">
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-all">Hubungi Support</button>
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-all">FAQ</button>
                    </div>
                  </div>

                </div>
              )}

              {/* Other Tabs (Sync/Settings Placeholder) */}
              {(activeTab === 'settings') && (
                <div className="flex flex-col items-center justify-center h-[60vh] animate-pulse">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4"><Settings size={32} className="text-slate-600" /></div>
                  <h2 className="text-xl font-bold text-slate-500 capitalize">{activeTab} Mode</h2>
                  <p className="text-slate-600 text-sm mt-2">Segera hadir pada pembaruan berikutnya.</p>
                </div>
              )}

            </main>
          </SidebarInset>

          {/* --- MODAL EDIT --- */}
          {isEditModalOpen && editingItem && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in" onClick={() => setIsEditModalOpen(false)}></div>
              <div className="bg-[#13161c] border border-white/10 rounded-3xl w-full max-w-lg relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                  <h3 className="font-bold flex items-center gap-2 text-white"><Edit2 size={16} className="text-lime-400" /> Metadata Editor</h3>
                  <button onClick={() => setIsEditModalOpen(false)}><X size={20} /></button>
                </div>
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/5">
                    <img src={editingItem.url} className="w-full h-full object-contain" alt="Aset" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Judul Aset</label>
                      <input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-lime-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2"><Tag size={12} className="inline mr-1" /> Tags (Press Enter)</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {editingItem.tags.map(t => (
                          <span key={t} className="bg-lime-500/10 text-lime-400 border border-lime-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                            #{t} <button onClick={() => { setEditingItem({ ...editingItem, tags: editingItem.tags.filter(tg => tg !== t) }) }}><X size={10} /></button>
                          </span>
                        ))}
                      </div>
                      <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagAdd} placeholder="Ketik tag dan Enter..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs outline-none focus:border-lime-500" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-black/20 border-t border-white/10 flex justify-end gap-3">
                  <button onClick={() => setIsEditModalOpen(false)} className="px-5 py-2 text-xs font-bold text-slate-500">Batal</button>
                  <button onClick={() => { setItems(items.map(i => i.id === editingItem.id ? editingItem : i)); setIsEditModalOpen(false) }} className="bg-lime-500 text-black px-8 py-2 rounded-xl font-bold text-xs shadow-lg shadow-lime-900/10">Save Metadata</button>
                </div>
              </div>
            </div>
          )}

          {/* CSS Utility */}
          <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;

```

## File: src\components\AppSidebar.jsx

```jsx
import * as React from "react"
import {
    LayoutGrid, Share2, Wand2, MessageSquare, Cloud, BookOpen, Settings,
    LogOut, ChevronRight, User, Palette, Zap
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Menu",
        links: [
            { id: "portfolio", title: "Workspace", icon: LayoutGrid },
            { id: "social", title: "Social Publish", icon: Share2 },
            { id: "tools", title: "Creative Tools", icon: Wand2 },
        ],
    },
    {
        title: "Support",
        links: [
            { id: "testimonials", title: "Testimonials", icon: MessageSquare },
            { id: "sync", title: "Sync Portfolio", icon: Cloud },
            { id: "docs", title: "User Guide", icon: BookOpen },
            { id: "settings", title: "Settings", icon: Settings },
        ],
    },
]

export function AppSidebar({ user, activeTab, setActiveTab, signOut, ...props }) {
    return (
        <Sidebar collapsible="icon" className="border-r border-white/5 sidebar-glass" {...props}>

            <SidebarContent>
                {items.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-600 px-4 mb-1 group-data-[collapsible=icon]:hidden">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.links.map((item) => (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={activeTab === item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            tooltip={item.title}
                                            className={`h-10 px-4 transition-all duration-200 ${activeTab === item.id
                                                ? "bg-lime-500/10 text-lime-400 font-bold"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <button>
                                                <item.icon className={activeTab === item.id ? "text-lime-400" : ""} />
                                                <span className="font-bold tracking-tight group-data-[collapsible=icon]:hidden">{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-white/5 bg-black/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-lime-400 to-green-600 flex items-center justify-center text-black font-extrabold uppercase shrink-0">
                                {user?.email?.charAt(0) || 'U'}
                            </div>
                            <div className="text-[10px] truncate flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                                <p className="font-black text-white truncate uppercase tracking-wider">
                                    {user?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-slate-500 font-bold italic">PRO MEMB</p>
                            </div>
                            <button
                                onClick={signOut}
                                className="p-1.5 text-slate-500 hover:text-red-400 transition-all group-data-[collapsible=icon]:hidden"
                                title="Sign Out"
                            >
                                <LogOut size={14} />
                            </button>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

```

## File: src\components\Auth.jsx

```jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase, signOut } from '../lib/supabase';
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import VisualynLogo from '../assets/Visualyn.png';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await signOut();
        setUser(null);
        setSession(null);
    };

    const value = {
        user,
        session,
        loading,
        signOut: handleSignOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Premium Login/Signup Component
export const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMessage('Check your email for the confirmation link!');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

            {/* Auth Card */}
            <div className="w-full max-w-md relative z-10">
                {/* Glassmorphism Card */}
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/50 relative overflow-hidden">
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

                    {/* Logo & Header */}
                    <div className="text-center mb-8 relative">
                        <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-white/5 rounded-2xl p-2 border border-white/10">
                            <img src={VisualynLogo} alt="Visualyn" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-slate-400 text-sm">
                            {isLogin ? 'Sign in to continue to Visualyn' : 'Start your creative journey'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div className="relative group">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all backdrop-blur-sm"
                                placeholder="Email address"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all backdrop-blur-sm"
                                placeholder="Password"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl backdrop-blur-sm animate-shake">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {message && (
                            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm p-4 rounded-xl backdrop-blur-sm">
                                {message}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-slate-500 text-xs uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Toggle Login/Register */}
                    <div className="text-center">
                        <button
                            onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
                            className="text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            {isLogin ? (
                                <>Don't have an account? <span className="text-emerald-400 font-medium">Sign Up</span></>
                            ) : (
                                <>Already have an account? <span className="text-emerald-400 font-medium">Sign In</span></>
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-600 text-xs mt-6">
                    By continuing, you agree to Visualyn's Terms of Service
                </p>
            </div>

            {/* Custom Styles */}
            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
        </div>
    );
};

```

## File: src\components\SocialPublish.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { connectSocial, uploadAsset, postMedia } from '../lib/supabase';
import { Share2, Upload, CheckCircle, Loader2, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';

// Connect Social Button
export const ConnectTikTokButton = () => {
    const [loading, setLoading] = useState(false);
    const [linkedPlatforms, setLinkedPlatforms] = useState([]);
    const [error, setError] = useState('');
    const [dashboardUrl, setDashboardUrl] = useState('');

    const checkStatus = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await connectSocial();
            if (data.dashboardUrl) {
                setDashboardUrl(data.dashboardUrl);
            }
            if (data.linkedPlatforms) {
                setLinkedPlatforms(data.linkedPlatforms);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
    }, []);

    const handleConnect = () => {
        if (dashboardUrl) {
            window.open(dashboardUrl, '_blank', 'width=800,height=700');
        } else {
            window.open('https://app.ayrshare.com/social-accounts', '_blank');
        }
    };

    return (
        <div className="bg-[var(--bg-card)] border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Share2 size={18} className="text-[var(--primary)]" />
                Connect Social Accounts
            </h3>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {linkedPlatforms.length > 0 && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm p-3 rounded-lg mb-4">
                    <p className="font-medium mb-1">Linked accounts:</p>
                    <p className="capitalize">{linkedPlatforms.join(', ')}</p>
                </div>
            )}

            <div className="flex gap-2">
                <button
                    onClick={handleConnect}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Checking...
                        </>
                    ) : (
                        <>
                            <ExternalLink size={18} />
                            {linkedPlatforms.length > 0 ? 'Manage Accounts' : 'Connect TikTok / Instagram'}
                        </>
                    )}
                </button>
                <button
                    onClick={checkStatus}
                    disabled={loading}
                    className="px-4 bg-[var(--bg-darkest)] border border-white/10 text-slate-400 hover:text-white rounded-xl transition-all disabled:opacity-50"
                    title="Refresh status"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <p className="text-slate-500 text-xs mt-3 text-center">
                Opens Ayrshare dashboard to link your social accounts
            </p>
        </div>
    );
};

// Publish Form
export const PublishForm = () => {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [platforms, setPlatforms] = useState(['tiktok']);
    const [uploading, setUploading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const togglePlatform = (platform) => {
        setPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        );
    };

    const handlePublish = async () => {
        if (!file) {
            setStatus({ type: 'error', message: 'Please select a video file' });
            return;
        }
        if (platforms.length === 0) {
            setStatus({ type: 'error', message: 'Please select at least one platform' });
            return;
        }

        try {
            // Step 1: Upload to Supabase Storage
            setUploading(true);
            setStatus({ type: 'info', message: 'Uploading video...' });
            const asset = await uploadAsset(file);
            const videoUrl = asset.url;

            // Step 2: Post to social media
            setUploading(false);
            setPosting(true);
            setStatus({ type: 'info', message: 'Posting to social media...' });
            const result = await postMedia(caption, videoUrl, platforms);

            setStatus({ type: 'success', message: result.message || 'Posted successfully!' });
            setFile(null);
            setCaption('');
        } catch (err) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setUploading(false);
            setPosting(false);
        }
    };

    const platformOptions = [
        { id: 'tiktok', name: 'TikTok', color: 'from-pink-500 to-rose-500' },
        { id: 'instagram', name: 'Instagram', color: 'from-purple-500 to-pink-500' },
        { id: 'facebook', name: 'Facebook', color: 'from-blue-500 to-blue-600' },
        { id: 'twitter', name: 'Twitter/X', color: 'from-slate-600 to-slate-700' },
    ];

    return (
        <div className="bg-[var(--bg-card)] border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Upload size={18} className="text-[var(--primary)]" />
                Publish Content
            </h3>

            {/* File Input */}
            <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">Video File</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-[var(--primary)]/50 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('videoInput').click()}
                >
                    <input
                        id="videoInput"
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {file ? (
                        <div className="text-[var(--primary)]">
                            <CheckCircle size={24} className="mx-auto mb-2" />
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    ) : (
                        <div className="text-slate-400">
                            <Upload size={24} className="mx-auto mb-2" />
                            <p className="text-sm">Click to select video</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Caption */}
            <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">Caption</label>
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write your caption here..."
                    className="w-full bg-[var(--bg-darkest)] border border-white/10 rounded-xl px-4 py-3 text-white h-24 resize-none focus:border-[var(--primary)] outline-none"
                />
            </div>

            {/* Platform Selection */}
            <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">Platforms</label>
                <div className="flex flex-wrap gap-2">
                    {platformOptions.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => togglePlatform(p.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${platforms.includes(p.id)
                                ? `bg-gradient-to-r ${p.color} text-white`
                                : 'bg-[#0f172a] text-slate-400 hover:text-white border border-white/10'
                                }`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Status Message */}
            {status.message && (
                <div className={`p-3 rounded-lg text-sm mb-4 flex items-center gap-2 ${status.type === 'error' ? 'bg-red-500/10 border border-red-500/30 text-red-400' :
                    status.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' :
                        'bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)]'
                    }`}>
                    {status.type === 'error' && <AlertCircle size={16} />}
                    {status.type === 'success' && <CheckCircle size={16} />}
                    {status.type === 'info' && <Loader2 size={16} className="animate-spin" />}
                    {status.message}
                </div>
            )}

            {/* Publish Button */}
            <button
                onClick={handlePublish}
                disabled={uploading || posting}
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-slate-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {uploading || posting ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        {uploading ? 'Uploading...' : 'Posting...'}
                    </>
                ) : (
                    <>
                        <Share2 size={18} />
                        Publish Now
                    </>
                )}
            </button>
        </div>
    );
};

```

## File: src\components\UI\button.jsx

```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

```

## File: src\components\UI\input.jsx

```jsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }

```

## File: src\components\UI\separator.jsx

```jsx
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef((
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props} />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

## File: src\components\UI\sheet.jsx

```jsx
"use client";
import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority";
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref} />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      <SheetPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props} />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

## File: src\components\UI\sidebar.jsx

```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef((props, ref) => {
  const {
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    variant = "sidebar",
    children,
    ...restProps
  } = props

  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((open) => !open)
      : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      variant,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar, variant]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-sidebar="wrapper"
          data-state={state}
          data-variant={variant}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            }
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className
          )}
          ref={ref}
          {...restProps}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef(
  (
    {
      side = "left",
      variant = "sidebar",
      className,
      collapsible = "offcanvas",
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden text-sidebar-foreground"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              }
            }
            side={side}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("group peer shrink-0 text-sidebar-foreground block transition-all duration-200 ease-in-out", className)}
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
        style={{
          width: state === "collapsed" ? SIDEBAR_WIDTH_ICON : SIDEBAR_WIDTH,
        }}
      >
        <div
          className={cn(
            "h-[calc(100vh-theme(spacing.16))] border-r border-white/5 bg-sidebar transition-[width] duration-200 ease-linear flex flex-col overflow-hidden",
            side === "left" ? "left-0" : "right-0",
            className
          )}
          style={{
            width: state === "collapsed" ? SIDEBAR_WIDTH_ICON : SIDEBAR_WIDTH,
          }}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}>
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props} />
  );
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      data-sidebar="main-content"
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background transition-all duration-200 ease-in-out",
        className
      )}
      {...props} />
  );
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...props} />
  );
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props} />
  );
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props} />
  );
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props} />
  );
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props} />
  );
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props} />
  );
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props} />
  );
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props} />
  );
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props} />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef((
  {
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
  },
  ref
) => {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props} />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip} />
    </Tooltip>
  );
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
        "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props} />
  );
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props} />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}>
      {showIcon && (
        <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />
      )}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width
          }
        } />
    </div>
  );
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props} />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef(
  ({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-sub-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
          className
        )}
        {...props} />
    );
  }
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

## File: src\components\UI\skeleton.jsx

```jsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props} />
  );
}

export { Skeleton }

```

## File: src\components\UI\tooltip.jsx

```jsx
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props} />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

## File: src\hooks\use-mobile.jsx

```jsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMobile
}

```

## File: src\index.css

```css
/* stylelint-disable */
@import "tailwindcss";
@import "./tailwind-features.css";

@font-face {
  font-family: 'Guton';
  src: url('./assets/fonts/Guton-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Guton';
  src: url('./assets/fonts/Guton-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Guton';
  src: url('./assets/fonts/Guton-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Guton';
  src: url('./assets/fonts/Guton-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Guton';
  src: url('./assets/fonts/Guton-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
}

:root {
  color-scheme: dark;

  /* Green Theme Colors - Refined for Azero Style */
  --primary: #22c55e;
  --primary-light: #4ade80;
  --primary-dark: #16a34a;
  --primary-hover: #10b981;
  --primary-glow: rgba(34, 197, 94, 0.3);

  --bg-darkest: #0f172a;
  --bg-dark: #111827;
  --bg-card: #1e293b;
  --bg-elevated: #334155;

  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --radius: 0.625rem;
  --sidebar-width: 16rem;
  --sidebar-width-icon: 3rem;
  --background: #0f172a;
  --foreground: #f9fafb;
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary-foreground: #ffffff;
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: rgba(15, 23, 42, 0.85);
  /* Slightly less transparent for better readability */
  --sidebar-foreground: #94a3b8;
  --sidebar-primary: #22c55e;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: rgba(255, 255, 255, 0.05);
  --sidebar-accent-foreground: #f8fafc;
  --sidebar-border: rgba(255, 255, 255, 0.05);
  --sidebar-ring: rgba(34, 197, 94, 0.5);
}

.sidebar-glass {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Global Sidebar Layout Fix - Removed as it was causing excessive gaps */

body {
  margin: 0;
  background-color: var(--bg-darkest);
  overflow-x: hidden;
  height: auto;
  min-height: 100vh;
  width: 100vw;
  font-family: 'Guton', sans-serif;
}

* {
  font-family: 'Guton', sans-serif !important;
}

@media (min-width: 768px) {
  body {
    overflow: auto;
    height: 100vh;
  }
}

#root {
  height: 100%;
}

/* Custom Scrollbar - Green Theme */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--primary-glow);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-glow {

  0%,
  100% {
    box-shadow: 0 0 20px var(--primary-glow);
  }

  50% {
    box-shadow: 0 0 40px var(--primary-glow);
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}

/* Premium UI Utilities */
.navbar-glass {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.logo-container {
  position: relative;
  transition: all 0.3s ease;
}

.logo-container::after {
  content: '';
  position: absolute;
  inset: -4px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  filter: blur(8px);
}

.logo-container:hover::after {
  opacity: 0.4;
}

.logo-container:hover {
  transform: scale(1.05);
}

.token-badge {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
}

.token-badge:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--primary-glow);
}


/* Mobile Fixes */
@media (max-width: 768px) {
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom, 20px);
  }

  html {
    font-size: 14px;
  }
}

/* Smooth active state for buttons */
button:active {
  transform: scale(0.98);
}

/* Focus styles - Green */
input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 3px var(--primary-glow);
}


.dark {
  --background: #0f172a;
  --foreground: #f9fafb;
  --card: #1e293b;
  --card-foreground: #f9fafb;
  --popover: #1e293b;
  --popover-foreground: #f9fafb;
  --primary: #22c55e;
  --primary-foreground: #ffffff;
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: rgba(15, 23, 42, 0.85);
  --sidebar-foreground: #94a3b8;
  --sidebar-primary: #22c55e;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: rgba(255, 255, 255, 0.05);
  --sidebar-accent-foreground: #f8fafc;
  --sidebar-border: rgba(255, 255, 255, 0.05);
  --sidebar-ring: rgba(34, 197, 94, 0.5);
}
```

## File: src\lib\supabase.js

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper: Get current session
export const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};

// Helper: Get current user
export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

// Helper: Sign out
export const signOut = async () => {
    await supabase.auth.signOut();
};

// Edge Function: Connect Social
export const connectSocial = async () => {
    const session = await getSession();
    if (!session) throw new Error('Not authenticated. Please log in.');

    const { data, error } = await supabase.functions.invoke('connect-social', {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    // Handle invoke-level errors (network, CORS, etc.)
    if (error) {
        console.error('Edge Function invoke error:', error);
        // Check if there's a response body with more details
        let detailedError = error.message || 'Unknown error calling Edge Function';
        if (error.context) {
            try {
                const body = typeof error.context === 'string'
                    ? JSON.parse(error.context)
                    : error.context;
                if (body?.error) detailedError = body.error;
            } catch (e) {
                // Ignore parse errors
            }
        }
        throw new Error(detailedError);
    }

    // Handle application-level errors returned by Edge Function
    if (data?.error) {
        throw new Error(data.error);
    }

    return data;
};

// Edge Function: Post Media
export const postMedia = async (caption, videoUrl, platforms) => {
    const session = await getSession();
    if (!session) throw new Error('Not authenticated');

    const res = await supabase.functions.invoke('post-media', {
        body: { caption, videoUrl, platforms },
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    if (res.error) throw new Error(res.error.message);
    return res.data;
};

// Helper: Upload asset to Storage and Database
export const uploadAsset = async (file) => {
    const session = await getSession();
    if (!session) throw new Error('Not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${session.user.id}/${Date.now()}.${fileExt}`;
    const type = file.type.startsWith('video/') ? 'video' : 'image';
    const bucket = type === 'video' ? 'videos' : 'assets';

    // 1. Upload to Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // 3. Save to Database
    const { data: dbData, error: dbError } = await supabase
        .from('workspace_assets')
        .insert({
            user_id: session.user.id,
            type: type,
            url: publicUrl,
            title: file.name.split('.')[0],
            tags: []
        })
        .select()
        .single();

    if (dbError) {
        console.warn('Failed to save to database, using storage URL only:', dbError);
        return {
            id: Date.now(),
            type,
            url: publicUrl,
            title: file.name.split('.')[0],
            tags: []
        };
    }

    return dbData;
};

// Helper: Fetch user assets
export const fetchAssets = async () => {
    const session = await getSession();
    if (!session) return [];

    const { data, error } = await supabase
        .from('workspace_assets')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.warn('Failed to fetch assets:', error);
        return [];
    }

    return data;
};

```

## File: src\lib\utils.js

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

```

## File: src\main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider, useAuth } from './components/Auth.jsx'
import { LoginPage, RegisterPage } from './pages'

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-darkest)] flex items-center justify-center">
        <div className="text-emerald-400 animate-pulse text-xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route wrapper (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f14] flex items-center justify-center">
        <div className="text-emerald-400 animate-pulse text-xl font-bold">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><App /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

```

## File: src\pages\index.js

```js
export { default as LoginPage } from './LoginPage';
export { default as RegisterPage } from './RegisterPage';

```

## File: src\pages\LoginPage.jsx

```jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import VisualynLogo from '../assets/Visualyn.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-darkest)] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

            {/* Login Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/50 relative overflow-hidden">
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

                    {/* Logo & Header */}
                    <div className="text-center mb-8 relative">
                        <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-white/5 rounded-2xl p-2 border border-white/10">
                            <img src={VisualynLogo} alt="Visualyn" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-400 text-sm">Sign in to continue to Visualyn</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="relative group">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                placeholder="Email address"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-slate-500 text-xs uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <Link
                            to="/register"
                            className="text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            Don't have an account? <span className="text-emerald-400 font-medium">Sign Up</span>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-600 text-xs mt-6">
                    By continuing, you agree to Visualyn's Terms of Service
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

```

## File: src\pages\RegisterPage.jsx

```jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, UserPlus, Check } from 'lucide-react';
import VisualynLogo from '../assets/Visualyn.png';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            setSuccess('Account created! Check your email for verification.');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-darkest)] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-green-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

            {/* Register Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/50 relative overflow-hidden">
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

                    {/* Logo & Header */}
                    <div className="text-center mb-8 relative">
                        <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-white/5 rounded-2xl p-2 border border-white/10">
                            <img src={VisualynLogo} alt="Visualyn" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
                        <p className="text-slate-400 text-sm">Start your creative journey</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="relative group">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                placeholder="Email address"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                placeholder="Password"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative group">
                            <Check size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                placeholder="Confirm password"
                                required
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm p-4 rounded-xl">
                                {success}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-slate-500 text-xs uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <Link
                            to="/login"
                            className="text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            Already have an account? <span className="text-emerald-400 font-medium">Sign In</span>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-600 text-xs mt-6">
                    By signing up, you agree to Visualyn's Terms of Service
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

```

## File: src\tailwind-features.css

```css
@plugin "tailwindcss-animate";
@custom-variant dark (&:is(.dark *));

@theme {
    --radius-sm: calc(var(--radius) - 4px);
    --radius-md: calc(var(--radius) - 2px);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) + 4px);
    --radius-2xl: calc(var(--radius) + 8px);
    --radius-3xl: calc(var(--radius) + 12px);
    --radius-4xl: calc(var(--radius) + 16px);
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-card: var(--card);
    --color-card-foreground: var(--card-foreground);
    --color-popover: var(--popover);
    --color-popover-foreground: var(--popover-foreground);
    --color-primary: var(--primary);
    --color-primary-foreground: var(--primary-foreground);
    --color-secondary: var(--secondary);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-muted: var(--muted);
    --color-muted-foreground: var(--muted-foreground);
    --color-accent: var(--accent);
    --color-accent-foreground: var(--accent-foreground);
    --color-destructive: var(--destructive);
    --color-border: var(--border);
    --color-input: var(--input);
    --color-ring: var(--ring);
    --color-chart-1: var(--chart-1);
    --color-chart-2: var(--chart-2);
    --color-chart-3: var(--chart-3);
    --color-chart-4: var(--chart-4);
    --color-chart-5: var(--chart-5);
    --color-sidebar: var(--sidebar);
    --color-sidebar-foreground: var(--sidebar-foreground);
    --color-sidebar-primary: var(--sidebar-primary);
    --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
    --color-sidebar-accent: var(--sidebar-accent);
    --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
    --color-sidebar-border: var(--sidebar-border);
    --color-sidebar-ring: var(--sidebar-ring);
}
```

## File: tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Guton', 'Inter', 'system-ui', 'sans-serif'],
            },
            screens: {
                'xs': '400px',
            },
        },
    },
    plugins: [],
}

```

## File: verify_setup.js

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uoheaxffwwonsxnxrkaw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaGVheGZmd3dvbnN4bnhya2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MjcwMDEsImV4cCI6MjA4NjIwMzAwMX0.KiUxiOgVwSdh7PATn_31GNked8BXgh3EeQ3GCyfD0i8'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log('Testing Supabase connection...')

    // 1. Check if we can connect at all (e.g. by fetching specific table, or just basic health check if possible)
    // Since we don't have a public table guaranteed, we'll try to fetch empty data from 'workspace_assets' 
    // to also verify if the table exists.

    console.log('Querying workspace_assets...')
    const { data, error } = await supabase
        .from('workspace_assets')
        .select('count', { count: 'exact', head: true })

    if (error) {
        console.error('Connection failed or table missing:', error.message)
        if (error.code === '42P01') {
            console.error('Table "workspace_assets" does not exist. Please run the schema setup SQL.')
        }
    } else {
        console.log('Connection successful! Table "workspace_assets" exists.')
    }
}

testConnection()

```

## File: verify_storage.js

```js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser
function loadEnv(filePath) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf-8');
    content.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
        }
    });
}

loadEnv(path.join(__dirname, '.env'));

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
    console.log('Checking Storage Buckets...');
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error('Error fetching buckets:', error.message);
        return;
    }

    const requiredBuckets = ['videos', 'assets'];
    const existingBuckets = buckets.map(b => b.name);

    for (const bucket of requiredBuckets) {
        if (existingBuckets.includes(bucket)) {
            console.log(`✅ Bucket "${bucket}" exists.`);
        } else {
            console.log(`❌ Bucket "${bucket}" is missing. Attempting to create...`);
            const { data, error: createError } = await supabase.storage.createBucket(bucket, {
                public: true,
            });
            if (createError) {
                console.error(`Failed to create bucket "${bucket}":`, createError.message);
            } else {
                console.log(`✅ Bucket "${bucket}" created successfully.`);
            }
        }
    }
}

checkStorage();

```

## File: vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

```

