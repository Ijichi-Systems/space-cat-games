/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React from 'react';
import { useSettings } from '../hooks/useSettings';

const PRESETS = [
    { name: 'Default', title: 'Space Cat Games - Home', icon: '/favicon.ico' },
    { name: 'Google', title: 'Google', icon: 'https://www.google.com/favicon.ico' },
    { name: 'Google Classroom', title: 'Classes', icon: 'https://ssl.gstatic.com/classroom/favicon.png' },
    { name: 'Canvas', title: 'Dashboard', icon: 'https://du11bjcvkw-gl.cloudfront.net/assets/favicon-00e97262.ico' },
    { name: 'Drive', title: 'My Drive - Google Drive', icon: 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png' },
];

export default function Settings() {
    const { settings, updateSettings, resetSettings } = useSettings();

    const handlePresetClick = (preset: typeof PRESETS[0]) => {
        updateSettings({ tabTitle: preset.title, tabIcon: preset.icon });
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="hero">
                <div className="container">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                        Preferences
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Customize your browsing experience with stealth mode and developer tools.
                    </p>
                </div>
            </div>

            <div className="container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Settings Column */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Tab Cloaking Section */}
                        <section className="bg-white/5 backdrop-blur-xl p-8 rounded-card border border-white/10 shadow-nav relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl">🕵️</div>
                                <div>
                                    <h2 className="text-2xl font-bold">Tab Cloaking</h2>
                                    <p className="text-text-muted">Hide your activity under a different tab identity.</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/80 mb-4">Quick Presets</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {PRESETS.map((preset) => (
                                            <button
                                                key={preset.name}
                                                onClick={() => handlePresetClick(preset)}
                                                className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all duration-500 relative group/btn overflow-hidden ${settings.tabTitle === preset.title
                                                        ? 'bg-gradient-to-br from-primary to-primary/80 border-primary shadow-[0_0_20px_rgba(231,76,60,0.4)] text-white'
                                                        : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20'
                                                    }`}
                                            >
                                                {/* Glow effect for active preset */}
                                                {settings.tabTitle === preset.title && (
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
                                                )}

                                                <img src={preset.icon} alt="" className="w-6 h-6 rounded-md object-contain relative z-10" />
                                                <span className="text-sm font-bold relative z-10">{preset.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Custom Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all placeholder:text-white/10 font-medium text-sm"
                                            value={settings.tabTitle}
                                            onChange={(e) => updateSettings({ tabTitle: e.target.value })}
                                            placeholder="e.g. My Important Document"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Favicon URL</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all placeholder:text-white/10 font-medium text-sm"
                                            value={settings.tabIcon}
                                            onChange={(e) => updateSettings({ tabIcon: e.target.value })}
                                            placeholder="https://example.com/icon.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Developer Mode Section */}
                        <section className="bg-white/5 backdrop-blur-2xl p-10 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[60px] rounded-full -mr-16 -mt-16" />

                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center text-3xl shadow-inner border border-white/5">💻</div>
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">Developer Mode</h2>
                                        <p className="text-text-muted mt-1 font-medium">Inject custom scripts and styling live.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => updateSettings({ enableCodeEditor: !settings.enableCodeEditor })}
                                    className={`w-20 h-10 rounded-full transition-all duration-500 relative p-1 pb-1.5 shadow-inner border border-white/10 ${settings.enableCodeEditor ? 'bg-secondary/80' : 'bg-white/5'
                                        }`}
                                >
                                    <div className={`absolute top-1 w-8 h-8 rounded-full transition-all duration-500 transform ${settings.enableCodeEditor ? 'translate-x-10 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'translate-x-0 bg-white/20'
                                        }`} />
                                </button>
                            </div>

                            {settings.enableCodeEditor && (
                                <div className="mt-10 animate-in fade-in zoom-in-95 duration-500">
                                    <div className="p-6 bg-secondary/10 border border-secondary/20 rounded-2xl text-secondary flex gap-5 items-center backdrop-blur-md">
                                        <span className="text-3xl">🚀</span>
                                        <p className="text-sm font-bold leading-relaxed">
                                            Live Code Editor is now active. Look for the rocket launchpad icon in the bottom right of your screen to start building.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar / Summary */}
                    <div className="space-y-8">
                        <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[32px] border border-white/10 shadow-2xl">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                System Info
                            </h3>
                            <p className="text-sm text-text-muted mb-8 leading-relaxed font-medium">
                                Your settings are synced to this browser and will persist even after you close the tab.
                            </p>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between items-center text-sm py-3 border-b border-white/5">
                                    <span className="text-text-muted font-bold uppercase tracking-widest text-[10px]">Registry</span>
                                    <span className="font-mono text-primary text-xs bg-primary/10 px-2 py-1 rounded-md">local_storage</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-3 border-b border-white/5">
                                    <span className="text-text-muted font-bold uppercase tracking-widest text-[10px]">Status</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${settings.enableCodeEditor ? 'bg-secondary/20 text-secondary' : 'bg-red-500/10 text-red-400'
                                        }`}>
                                        {settings.enableCodeEditor ? 'Active' : 'Standby'}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={resetSettings}
                                className="w-full py-5 bg-gradient-to-r from-red-500/5 to-red-600/5 hover:from-red-500 hover:to-red-600 border border-red-500/20 hover:border-red-500 rounded-2xl transition-all duration-500 text-xs font-black uppercase tracking-[0.25em] text-red-400 hover:text-white hover:shadow-[0_10px_30px_rgba(239,68,68,0.3)] group"
                            >
                                <span className="group-hover:scale-110 transition-transform inline-block">Reset Core Engine</span>
                            </button>
                        </div>

                        <div className="p-6 rounded-card border border-white/5 bg-white/[0.02] text-center">
                            <p className="text-xs text-text-muted">Space Cat Games v{__BUILD_INFO__.appVersion}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
