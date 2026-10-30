import React from 'react';
import { Shield, Globe, LayoutGrid, Zap } from 'lucide-react';

interface MobileNavProps {
  activeTab: 'connect' | 'servers' | 'apps' | 'turbo';
  setActiveTab: (tab: 'connect' | 'servers' | 'apps' | 'turbo') => void;
  isConnected: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  isConnected,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-around">
      <button
        onClick={() => setActiveTab('connect')}
        className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] min-h-[44px] transition-colors ${
          activeTab === 'connect' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
        }`}
      >
        <Shield className="w-5 h-5 mb-1" />
        <span className="text-[11px] leading-none">VPN Dial</span>
      </button>

      <button
        onClick={() => setActiveTab('servers')}
        className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] min-h-[44px] transition-colors ${
          activeTab === 'servers' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
        }`}
      >
        <Globe className="w-5 h-5 mb-1" />
        <span className="text-[11px] leading-none">Servers</span>
      </button>

      <button
        onClick={() => setActiveTab('apps')}
        className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] min-h-[44px] transition-colors ${
          activeTab === 'apps' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
        }`}
      >
        <LayoutGrid className="w-5 h-5 mb-1" />
        <span className="text-[11px] leading-none">Apps Hub</span>
      </button>

      <button
        onClick={() => setActiveTab('turbo')}
        className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] min-h-[44px] transition-colors ${
          activeTab === 'turbo' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
        }`}
      >
        <Zap className="w-5 h-5 mb-1 text-amber-400" />
        <span className="text-[11px] leading-none">WiFi Turbo</span>
      </button>
    </div>
  );
};
