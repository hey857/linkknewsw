import React, { useState } from 'react';
import { Globe, ArrowRight, Shield, Zap, ExternalLink } from 'lucide-react';
import { VpnServer } from '../types/vpn';

interface ProxyBrowserBarProps {
  activeServer: VpnServer;
  isConnected: boolean;
}

export const ProxyBrowserBar: React.FC<ProxyBrowserBarProps> = ({
  activeServer,
  isConnected,
}) => {
  const [urlInput, setUrlInput] = useState('');

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    let target = urlInput.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      if (target.includes('.') && !target.includes(' ')) {
        target = `https://${target}`;
      } else {
        target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
      }
    }

    window.open(target, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-2 mb-4">
      <form
        onSubmit={handleGo}
        className="bg-slate-900/90 border border-slate-800 rounded-xl p-2 flex items-center gap-2 shadow-lg"
      >
        <div className="flex items-center gap-2 pl-2 text-xs font-mono text-slate-400 shrink-0">
          <Shield className={`w-3.5 h-3.5 ${isConnected ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span className="hidden sm:inline">
            {isConnected ? `Proxy: ${activeServer.city}` : 'Direct'}
          </span>
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Type any website URL or search term (e.g. youtube.com, instagram.com, google.com)..."
            className="w-full pl-3 pr-4 py-1.5 bg-slate-950 border border-slate-800/80 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
          />
        </div>

        <button
          type="submit"
          className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Open Unblocked</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
