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
