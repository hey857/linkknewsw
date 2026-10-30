import React from 'react';
import {
  Zap,
  ShieldCheck,
  Globe2,
  Server,
  Layers,
  Cpu,
  Smartphone,
  Gauge,
  Check,
} from 'lucide-react';
import { TurboConfig } from '../types/vpn';

interface TurboSettingsProps {
  config: TurboConfig;
  onChangeConfig: (newConfig: TurboConfig) => void;
  onRunSpeedTest: () => void;
}

export const TurboSettings: React.FC<TurboSettingsProps> = ({
  config,
  onChangeConfig,
  onRunSpeedTest,
}) => {
  const toggle = (key: keyof TurboConfig) => {
    onChangeConfig({
      ...config,
      [key]: !config[key],
    });
  };

  const setDns = (dns: 'cloudflare' | 'google' | 'quad9') => {
    onChangeConfig({
      ...config,
      dnsOptimizer: dns,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>WiFi Turbo Accelerator & Speed Optimizer</span>
            <span className="text-xs font-mono font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
              High-Throughput
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Engineered to absorb maximum bandwidth from your WiFi network with zero latency jitter.
          </p>
        </div>

        <button
          onClick={onRunSpeedTest}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer shadow-sm"
        >
          <Gauge className="w-4 h-4" />
          <span>Verify Speed Gain</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Toggle 1: Multi-Socket WiFi Acceleration */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-white">Multi-Socket WiFi Absorption</h4>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                  Max WiFi Speed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Opens parallel TCP multiplex streams to saturate local WiFi frequency and eliminate packet queue latency.
              </p>
            </div>
          </div>

          <button
            onClick={() => toggle('wifiMultiSocket')}
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 cursor-pointer ${
              config.wifiMultiSocket ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                config.wifiMultiSocket ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Ad & Script Stripper */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-white">Ad & Tracker Stripper</h4>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.2 rounded">
                  Saves 55% Data
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Strips heavy video trackers and third-party analytics before they load, speeding up website rendering 3x.
              </p>
            </div>
          </div>

          <button
            onClick={() => toggle('adBlocker')}
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 cursor-pointer ${
              config.adBlocker ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                config.adBlocker ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 3: Brotli Fast Stream Compression */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-white">Stream Packet Compression</h4>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                  Brotli 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Compresses incoming web payloads directly at the edge VPN node for instant page loads on mobile & laptops.
              </p>
            </div>
          </div>

          <button
            onClick={() => toggle('dataCompression')}
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 cursor-pointer ${
              config.dataCompression ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                config.dataCompression ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 4: TCP BBR Congestion Avoidance */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-white">TCP BBR Congestion Control</h4>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded">
                  Low Jitter
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Prevents WiFi router buffer bloat during simultaneous 4K streaming and downloads.
              </p>
            </div>
          </div>

          <button
            onClick={() => toggle('tcpBbr')}
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 cursor-pointer ${
              config.tcpBbr ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                config.tcpBbr ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* DNS Provider Selector */}
      <div className="mt-6 p-4 sm:p-5 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-semibold text-white">Encrypted DNS over HTTPS Resolver</h4>
          </div>
          <span className="text-xs font-mono text-emerald-400">Zero DNS Leaks</span>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Select ultra-fast DNS servers to eliminate ISP domain resolution delays when loading YouTube, Instagram, or Google.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setDns('cloudflare')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              config.dnsOptimizer === 'cloudflare'
                ? 'bg-slate-800 border-emerald-500/80 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs">Cloudflare DNS</span>
              {config.dnsOptimizer === 'cloudflare' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <span className="text-[11px] font-mono text-slate-400 block mt-1">1.1.1.1 (Fastest)</span>
          </button>

          <button
            onClick={() => setDns('google')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              config.dnsOptimizer === 'google'
                ? 'bg-slate-800 border-emerald-500/80 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs">Google Public DNS</span>
              {config.dnsOptimizer === 'google' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <span className="text-[11px] font-mono text-slate-400 block mt-1">8.8.8.8 (Global Anycast)</span>
          </button>

          <button
            onClick={() => setDns('quad9')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              config.dnsOptimizer === 'quad9'
                ? 'bg-slate-800 border-emerald-500/80 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs">Quad9 Security</span>
              {config.dnsOptimizer === 'quad9' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <span className="text-[11px] font-mono text-slate-400 block mt-1">9.9.9.9 (Malware Block)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
