/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React, { useState } from 'react';
import { useSettings } from '../hooks/useSettings';

export default function CodeEditor() {
    const { settings, updateSettings } = useSettings();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'js' | 'css'>('js');

    if (!settings.enableCodeEditor) return null;

    return (
        <div
            className={`fixed bottom-6 right-6 z-[10000] transition-all duration-500 ease-out ${isOpen ? 'w-[450px] h-[550px]' : 'w-14 h-14'
                }`}
            style={{
                background: 'rgba(15, 15, 15, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: isOpen ? '24px' : '50%',
                boxShadow: isOpen
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(52, 152, 219, 0.1)'
                    : '0 10px 20px rgba(0, 0, 0, 0.4)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full h-full flex items-center justify-center text-2xl hover:bg-white/10 transition-all duration-300 group"
                    title="Open Code Injector"
                >
                    <span className="group-hover:scale-110 transition-transform">🚀</span>
                </button>
            ) : (
                <>
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🛠️</span>
                            <h3 className="font-bold text-sm uppercase tracking-widest text-white/80">Code Injector</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-text-muted hover:text-white transition-all"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-3 gap-2 bg-black/40 mx-5 mt-2 rounded-[20px] border border-white/5">
                        <button
                            onClick={() => setActiveTab('js')}
                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 relative overflow-hidden ${activeTab === 'js'
                                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-[0_5_15px_rgba(231,76,60,0.3)]'
                                    : 'text-white/40 hover:bg-white/5 hover:text-white/70'
                                }`}
                        >
                            {activeTab === 'js' && <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30" />}
                            <span className="relative z-10">JavaScript</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('css')}
                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 relative overflow-hidden ${activeTab === 'css'
                                    ? 'bg-gradient-to-r from-secondary to-secondary/80 text-white shadow-[0_5_15px_rgba(52,152,219,0.3)]'
                                    : 'text-white/40 hover:bg-white/5 hover:text-white/70'
                                }`}
                        >
                            {activeTab === 'css' && <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30" />}
                            <span className="relative z-10">CSS Styles</span>
                        </button>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 p-5 pt-3 relative group/editor">
                        <textarea
                            className={`w-full h-full bg-black/60 border border-white/5 rounded-[24px] p-6 font-mono text-xs resize-none outline-none transition-all duration-500 shadow-inner leading-relaxed ${activeTab === 'js' ? 'focus:border-primary/30 focus:ring-1 focus:ring-primary/20' : 'focus:border-secondary/30 focus:ring-1 focus:ring-secondary/20'
                                }`}
                            placeholder={activeTab === 'js' ? "// Write your logic here..." : "/* Add your custom styles... */"}
                            value={activeTab === 'js' ? settings.customJS : settings.customCSS}
                            onChange={(e) => updateSettings({ [activeTab === 'js' ? 'customJS' : 'customCSS']: e.target.value })}
                            spellCheck={false}
                        />
                        <div className={`absolute bottom-10 right-10 pointer-events-none transition-all duration-700 font-black italic opacity-5 ${activeTab === 'js' ? 'text-primary scale-110' : 'text-secondary scale-110'
                            }`}>
                            <span className="text-6xl">{activeTab === 'js' ? 'JS' : 'CSS'}</span>
                        </div>
                    </div>

                    {/* Footer Controls */}
                    <div className="p-5 px-8 border-t border-white/5 flex justify-between items-center bg-black/20">
                        <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                            <span className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-black">Link Established</span>
                        </div>
                        <button
                            onClick={() => {
                                if (confirm('Wipe ' + activeTab.toUpperCase() + ' memory buffer?')) {
                                    updateSettings({ [activeTab === 'js' ? 'customJS' : 'customCSS']: '' });
                                }
                            }}
                            className="text-[9px] font-black uppercase tracking-[0.2em] text-red-400/40 hover:text-red-400 transition-all py-2 px-4 rounded-xl hover:bg-red-400/10 border border-transparent hover:border-red-400/20"
                        >
                            Clear Buffer
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
