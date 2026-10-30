import React from 'react';
import { Shield, ShieldCheck, Zap, Power } from 'lucide-react';
import { ConnectionState, VpnServer } from '../types/vpn';

interface HeaderProps {
  connectionState: ConnectionState;
  activeServer: VpnServer;
  onToggleConnect: () => void;
  activeTab: 'connect' | 'servers' | 'apps' | 'turbo';
  setActiveTab: (tab: 'connect' | 'servers' | 'apps' | 'turbo') => void;
  wifiAbsorbedSpeed: number; // in Mbps
}

export const Header: React.FC<HeaderProps> = ({
  connectionState,
  activeServer,
  onToggleConnect,
  activeTab,
  setActiveTab,
  wifiAbsorbedSpeed,
}) => {
  const isConnected = connectionState === 'connected';
  const isConnecting = connectionState === 'connecting';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={() => setActiveTab('connect')}
          className="flex items-center gap-2.5 text-left text-white whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            isConnected
              ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50'
              : 'bg-slate-800 text-slate-300'
          }`}>
            {isConnected ? <ShieldCheck className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
          </div>
          <div>
            <div className="font-bold tracking-tight text-base sm:text-lg leading-tight flex items-center gap-1.5">
              <span>AeroShield</span>
              <span className="text-emerald-400 font-mono text-xs font-semibold px-1.5 py-0.5 bg-emerald-500/10 rounded">FREE</span>
            </div>
          </div>
        </button>

        {/* Zone 2: 4-5 clean single-line text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('connect')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'connect'
                ? 'text-white border-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            VPN Dial
          </button>
          <button
            onClick={() => setActiveTab('servers')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'servers'
                ? 'text-white border-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Free Servers (35+)
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'apps'
                ? 'text-white border-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Unblocked Apps Hub
          </button>
          <button
            onClick={() => setActiveTab('turbo')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'turbo'
                ? 'text-white border-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>WiFi Turbo Booster</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 pr-2 border-r border-slate-800">
            <span>Absorption:</span>
            <span className="text-emerald-400 font-semibold tabular-nums">{wifiAbsorbedSpeed.toFixed(1)} Mbps</span>
          </div>

          <button
            onClick={onToggleConnect}
            disabled={isConnecting}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              isConnected
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25'
                : isConnecting
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-sm'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>
              {isConnecting ? 'Routing...' : isConnected ? `Disconnect (${activeServer.city})` : 'Quick Connect'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
