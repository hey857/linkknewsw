import React, { useEffect, useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Power,
  Globe,
  ArrowDown,
  ArrowUp,
  Wifi,
  Lock,
  Zap,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { ConnectionState, VpnServer, TurboConfig } from '../types/vpn';

interface VpnDialProps {
  connectionState: ConnectionState;
  activeServer: VpnServer;
  onToggleConnect: () => void;
  onOpenServerModal: () => void;
  onOpenSpeedTest: () => void;
  onOpenTurbo: () => void;
  turboConfig: TurboConfig;
  downloadSpeed: number;
  uploadSpeed: number;
  wifiAbsorbedEfficiency: number;
}

export const VpnDial: React.FC<VpnDialProps> = ({
  connectionState,
  activeServer,
  onToggleConnect,
  onOpenServerModal,
  onOpenSpeedTest,
  onOpenTurbo,
  turboConfig,
  downloadSpeed,
  uploadSpeed,
  wifiAbsorbedEfficiency,
}) => {
  const [sessionSeconds, setSessionSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (connectionState === 'connected') {
      interval = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSessionSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connectionState]);

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isConnected = connectionState === 'connected';
  const isConnecting = connectionState === 'connecting';

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-4 sm:py-8 px-4">
      {/* Top status indicator */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
        <span>STATUS:</span>
        <span
          className={`font-semibold tracking-wide uppercase ${
            isConnected
              ? 'text-emerald-400'
              : isConnecting
              ? 'text-amber-400 animate-pulse'
              : 'text-slate-500'
          }`}
        >
          {isConnected ? 'ENCRYPTED & PROTECTED' : isConnecting ? 'TUNNELING PROTOCOL...' : 'UNPROTECTED'}
        </span>
        <span aria-hidden="true" className="text-slate-700">·</span>
        <span>PROTOCOL:</span>
        <span className="text-slate-300 font-semibold">{activeServer.protocols[0]}</span>
      </div>

      {/* Main interactive connection dial */}
      <div className="relative flex items-center justify-center my-4 sm:my-6">
        {/* Outer glowing pulsing halo when connected */}
        {isConnected && (
          <div className="absolute inset-0 -m-6 sm:-m-8 rounded-full bg-emerald-500/10 blur-xl animate-pulse pointer-events-none" />
        )}

        {/* Circular Dial Button */}
        <button
          onClick={onToggleConnect}
          disabled={isConnecting}
          aria-label={isConnected ? 'Disconnect VPN' : 'Connect VPN'}
          className={`relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none cursor-pointer ${
            isConnected
              ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/80 ring-8 ring-emerald-500/10 hover:ring-emerald-500/20'
              : isConnecting
              ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/80 ring-8 ring-amber-500/10 animate-spin-slow'
              : 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-700 hover:border-emerald-500/50 ring-4 ring-slate-800/40 hover:ring-emerald-500/10'
          }`}
        >
          {/* Inner content */}
          <div className="flex flex-col items-center justify-center text-center p-4">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2.5 transition-all ${
                isConnected
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : isConnecting
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-slate-800 text-slate-300 group-hover:text-white'
              }`}
            >
              {isConnected ? (
                <ShieldCheck className="w-8 h-8 sm:w-9 sm:h-9" />
              ) : isConnecting ? (
                <RotateCcw className="w-8 h-8 sm:w-9 sm:h-9 animate-spin" />
              ) : (
                <Power className="w-7 h-7 sm:w-8 sm:h-8" />
              )}
            </div>

            <span className="text-sm sm:text-base font-bold text-white tracking-wide">
              {isConnected ? 'DISCONNECT' : isConnecting ? 'CONNECTING...' : 'TAP TO CONNECT'}
            </span>

            <span className="text-xs font-mono text-slate-400 mt-1 tabular-nums">
              {isConnected ? formatTime(sessionSeconds) : 'Free Unlimited'}
            </span>
          </div>
        </button>
      </div>

      {/* Selected country server card */}
      <div className="w-full max-w-lg mt-6 bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl" role="img" aria-label={activeServer.country}>
            {activeServer.flag}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-semibold text-white">
                {activeServer.country}
              </span>
              <span className="text-xs text-slate-400">({activeServer.city})</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 rounded">
                FREE
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1 font-mono">
                <span className="text-emerald-400">●</span> {activeServer.ping}ms
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">Load: {activeServer.load}%</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{isConnected ? activeServer.ip : 'Mask Ready'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenServerModal}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span>Change Country</span>
        </button>
      </div>

      {/* Live Speed & WiFi Absorption Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mt-5">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <ArrowDown className="w-3 h-3 text-emerald-400" />
              <span>Download</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Mbps</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
            {isConnected ? downloadSpeed.toFixed(1) : '0.0'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Throughput rate</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <ArrowUp className="w-3 h-3 text-cyan-400" />
              <span>Upload</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400">Mbps</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
            {isConnected ? uploadSpeed.toFixed(1) : '0.0'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Encrypted upstream</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-amber-400" />
              <span>WiFi Absorption</span>
            </span>
            <span className="text-[10px] font-mono text-amber-400">%</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
            {isConnected ? wifiAbsorbedEfficiency.toFixed(1) : '94.2'}%
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Signal saturation</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>Security</span>
            </span>
            <span className="text-[10px] font-mono text-indigo-400">AES-256</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-white mt-1">
            {turboConfig.adBlocker ? 'AdBlock ON' : 'Standard'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Zero logs policy</div>
        </div>
      </div>

      {/* Action buttons strip: WiFi Speed Test & Turbo Booster shortcut */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
        <button
          onClick={onOpenSpeedTest}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Run Live WiFi Speed Test</span>
        </button>

        <button
          onClick={onOpenTurbo}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <span>WiFi Turbo Accelerator Settings</span>
        </button>
      </div>
    </div>
  );
};
