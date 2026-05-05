/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React from 'react';
import { useSettings } from '../hooks/useSettings';

const PRESETS = [
    { name: 'Default', title: 'Space Cat Games - Home', icon: '/favicon.ico' },
    { name: 'Google', title: 'Google', icon: 'https://www.google.com/favicon.ico' },
    { name: 'Google Classroom', title: 'Classes', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABpklEQVR4AaSTA4weURRGz53atm3HqRWrNsI6ThvUje2ktuLaQY2ojmpb6925nf/L68sy6pfc8TnzyP/Gls9qtWL2FOaaOYZTPnriBqFcRbhOOH6l7IiV3Grj5nnkBJiXpxGM4WkUBGGiZ24NqU1ZPpjxIL81jwrb5C4DDLjrrEodUl0zqMF3Bjf8CWkBtWXGeZjfhuPf+oMBAW5Yp4HAP0V/giDFs5rd2jPJL7Uqic1KXS+9TB8J3jhxLZsmraNRdq3WxBbFXiIBkoAEqasWD59D9+Zd6N6iC0tHzRdMLCBwoQtZpQgE6dlz72AGd9X1rjsHUAsrt8KhtrthTmwBIX8K89hwbpuAvKK8CMf2YzixBfp7FAxuP4BB7QfqDPDw/WNuvbjL8y/PJVFr/3VBFxIgwZoxy5nQZyzlMygTzR4xnZMPz7Dj2m6UMPiJpxZsaoXgmtKjZffysJjaeALk5vUns1u94uHTXZSPOzF5eR+Y0+Ydgxr+jivV8i60dd0Z1UeC0MJwhrgnsAVT6y+ZP6X+kshbOTCe7O+QDYKDJbu/L6A4OwMApdYioDVVbTQAAAAASUVORK5CYII=' },
    { name: 'Canva', title: 'Dashboard', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAWlBMVEUCwswIuc4NrdEZo9QjldcyiNhOuNmt3ev////u9fyH1OLY5Phryt02eN9FcNwCmNRQYeBeTuMlhd5qO+grU+WAi+w8Zeh6Kumvs/RHM+5KTPFzJ/BZNvdkJ/qcqMW7AAABD0lEQVR4AXXPBRLDMAxEUVMTOcyc+1+zK6kMv4N9s3JrvrLIOe99uHybYYQG4N9l+LN0fzCB3YfvmBKKmfuBGVFe2IIog3lY+WYZP5hRvA2rh2GRsvG0FisrY/kDxGP6J1LKaxiGQDHLR0GIKNGjglIkEvI+T2oQjlbNHXGVCd1uwhrjrMM5/jlCAckO1honZcBapGMSU/SuFmRCpVrbtsZzdcEoIqTWM/IzRPFOQz6q9YZv4VokAkzlNA0jDWLzbDptIcqHCcFGmSmWPBkitBmGZqFlhYGAQlxOeDcSTGaCk7Rt2zrmkeLSrqB9VhRBUO44QPusahQODXTuSE3wDudx7mr3pX6tvRtQ4R3vegWNXiIGxpIzCAAAAABJRU5ErkJggg==' },
    { name: 'Drive', title: 'My Drive - Google Drive', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAB+klEQVR4AWJwL/ChKx68ForXW7SJN1iswYb5GyxaqGqhycrgR+rTAKzUA2hoURwG8Cn3bL/wbNuIz7Y5p9kOY57NMBvZs23bPtt/dW7b4VR94ep3v6OHaJvFJSoaZldQROB+hDJValcFPBj20vB82AsEAYCVyTT1uUykaWitGAQIB1oy22WoKOhKQMCCMKa0dLypYN9dTs7HcMvg5YCAHQKAzLmwpwpYGbORBHH2LAfMY4G4JdmOaJkvBQnsMQ+DHAl5MTSeqjaMASaarvZ00SB8UATCyp1OVzMWgfBDiwLhY7J2+Nn5LScyVCkUfkoI3nLqWivAcB7j52HYSISMEJz9WIwEyyE/AAtEBJLbRLoNiBxigIcVgDO08AwFwnkpwfx4Sx1aSFrmLwAvRDz+BBtaFB6Gg9txA9sEg6d9NLNO+/5HvFz0sXXardmy567d4CFW4F5V1BuXiUgVNBa5jpdEBdz2vTRy2/cyxMtduyFpTjtMotobD1D75Yvs3LjopYDwh9v/5CNWrtsOSjGc/8bFqP/mHtRx7zyVodP7tisgZMeffB8SO6xfLYeIlllvTSkM2jH34UraQeB5VkvexoeWWsttR7bEaPu9Cz95IEZbAVw8wm461+7uuXrp4Q0L6LxxS/NKQQ+t2HpYKEKQPMhXkpkNqoYwXTEA+kphQitc/vYAAAAASUVORK5CYII=' },
    { name: 'Schoology', title: 'Home | Schoology', icon: 'https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico' },
    { name: 'New tab', title: 'New tab', icon: 'null'},

];

export default function Settings() {
    const { settings, updateSettings, resetSettings } = useSettings();

    const handlePresetClick = (preset: typeof PRESETS[0]) => {
        updateSettings({ tabTitle: preset.title, tabIcon: preset.icon });
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#121212', color: '#eee' }}>
            {/* Hero Section */}
            <div className="premium-hero">
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem', background: 'linear-gradient(to right, #e74c3c, #3498db)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Preferences
                    </h1>
                    <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        "NO DON'T PRESS THAT BIG RED BUTTO-" *explosion sounds*
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                    {/* Main Settings Column */}
                    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '40px' }}>

                        {/* Tab Cloaking Section */}
                        <section className="glass-card" style={{ padding: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                                <div style={{ fontSize: '2.5rem', width: '60px', height: '60px', background: 'rgba(231, 76, 60, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🕵️</div>
                                <div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0' }}>Tab Cloaking</h2>
                                    <p style={{ color: '#888', margin: '5px 0 0' }}>Disguise your browser tab instantly.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div>
                                    <h3 style={{ fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#e74c3c', marginBottom: '15px' }}>Quick Presets</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px' }}>
                                        {PRESETS.map((preset) => (
                                            <button
                                                key={preset.name}
                                                onClick={() => handlePresetClick(preset)}
                                                className={`premium-btn ${settings.tabTitle === preset.title ? 'premium-btn-primary' : 'premium-btn-outline'}`}
                                            >
                                                <img src={preset.icon} alt="" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                                <span>{preset.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', color: '#e74c3c', marginLeft: '5px', marginBottom: '8px', display: 'block' }}>Custom Title</label>
                                        <input
                                            type="text"
                                            className="premium-input"
                                            value={settings.tabTitle}
                                            onChange={(e) => updateSettings({ tabTitle: e.target.value })}
                                            placeholder="e.g. My Document"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', color: '#e74c3c', marginLeft: '5px', marginBottom: '8px', display: 'block' }}>Favicon URL</label>
                                        <input
                                            type="text"
                                            className="premium-input"
                                            value={settings.tabIcon}
                                            onChange={(e) => updateSettings({ tabIcon: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div className="glass-card" style={{ padding: '40px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ width: '8px', height: '8px', background: '#e74c3c', borderRadius: '50%' }} />
                                Local Storage
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: '1.6', marginBottom: '30px' }}>
                                Your preferences are synchronized with this browser's local storage and persist across sessions. Clearing data will remove ALL YOUR SAVE DATA from ALL GAMES!
                            </p>


                            <button
                                onClick={resetSettings}
                                className="premium-btn"
                                style={{ width: '100%', background: 'rgba(231, 76, 60, 0.05)', border: '1px solid rgba(231, 76, 60, 0.2)', color: '#e74c3c' }}
                            >
                                Clear localstorage
                            </button>
                            
                        </div>

                        <div className="p-6 rounded-card border border-white/5 bg-white/[0.02] text-center" style={{ marginTop: '20px' }}>
                            <p style={{ fontSize: '0.8rem', color: '#888' }}>Space Cat Games v{__BUILD_INFO__.appVersion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
