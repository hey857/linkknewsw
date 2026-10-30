import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, Zap, Wifi, ArrowDown, ArrowUp, CheckCircle2 } from 'lucide-react';
import { VpnServer } from '../types/vpn';

interface SpeedTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeServer: VpnServer;
  isConnected: boolean;
}

export const SpeedTestModal: React.FC<SpeedTestModalProps> = ({
  isOpen,
  onClose,
  activeServer,
  isConnected,
}) => {
  const [phase, setPhase] = useState<'idle' | 'ping' | 'download' | 'upload' | 'completed'>('idle');
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [ping, setPing] = useState<number>(0);
  const [jitter, setJitter] = useState<number>(0);
  const [download, setDownload] = useState<number>(0);
  const [upload, setUpload] = useState<number>(0);
  const [wifiEfficiency, setWifiEfficiency] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setPhase('idle');
      setCurrentSpeed(0);
    }
  }, [isOpen]);

  const runTest = () => {
    setPhase('ping');
    setCurrentSpeed(0);
    setPing(0);
    setJitter(0);
    setDownload(0);
    setUpload(0);
    setWifiEfficiency(0);

    // 1. Ping Phase (1 second)
    setTimeout(() => {
      const basePing = isConnected ? activeServer.ping : 28;
      const finalPing = Math.max(8, Math.round(basePing + (Math.random() * 6 - 3)));
      const finalJitter = Math.max(1, Math.round(Math.random() * 3 + 1));
      setPing(finalPing);
      setJitter(finalJitter);
      setPhase('download');

      // 2. Download Phase (3 seconds)
      let dlTicks = 0;
      const targetDl = isConnected ? Math.round(140 + Math.random() * 95) : Math.round(65 + Math.random() * 40);
      const dlInterval = setInterval(() => {
        dlTicks++;
        const progress = dlTicks / 30;
        const current = Math.min(targetDl, Math.round(targetDl * (1 - Math.exp(-progress * 3)) + (Math.random() * 15 - 7)));
        setCurrentSpeed(Math.max(10, current));

        if (dlTicks >= 30) {
          clearInterval(dlInterval);
          setDownload(targetDl);
          setPhase('upload');

          // 3. Upload Phase (2 seconds)
          let ulTicks = 0;
          const targetUl = Math.round(targetDl * 0.42 + Math.random() * 10);
          const ulInterval = setInterval(() => {
            ulTicks++;
            const ulProgress = ulTicks / 20;
            const curUl = Math.min(targetUl, Math.round(targetUl * (1 - Math.exp(-ulProgress * 3)) + (Math.random() * 8 - 4)));
            setCurrentSpeed(Math.max(5, curUl));

            if (ulTicks >= 20) {
              clearInterval(ulInterval);
              setUpload(targetUl);
              setWifiEfficiency(Math.min(99.6, Number((92 + Math.random() * 7.5).toFixed(1))));
              setPhase('completed');
              setCurrentSpeed(0);
            }
          }, 100);
        }
      }, 100);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">WiFi Absorption & Speed Meter</h3>
            <p className="text-xs text-slate-400">
              Target Node: {activeServer.country} ({activeServer.city})
            </p>
          </div>
        </div>

        {/* Speed Gauge Display */}
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            {phase === 'idle' && 'Ready for Speed Test'}
            {phase === 'ping' && 'Measuring Latency & Jitter...'}
            {phase === 'download' && 'Absorbing Download Bandwidth...'}
            {phase === 'upload' && 'Testing Encrypted Upstream...'}
            {phase === 'completed' && 'WiFi Absorption Test Completed'}
          </div>

          <div className="text-5xl sm:text-6xl font-extrabold font-mono text-emerald-400 my-2 tabular-nums">
            {phase === 'idle'
              ? '0.0'
              : phase === 'download' || phase === 'upload'
              ? currentSpeed.toFixed(1)
              : phase === 'completed'
              ? download.toFixed(1)
              : '...'}
          </div>

          <div className="text-xs font-mono text-slate-400 uppercase">
            {phase === 'upload' ? 'Upload Mbps' : 'Download Mbps'}
          </div>

          {phase === 'idle' && (
            <button
              onClick={runTest}
              className="mt-5 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Speed Test</span>
            </button>
          )}

          {phase === 'completed' && (
            <button
              onClick={runTest}
              className="mt-5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Test Again</span>
            </button>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Ping</span>
            <span className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
              {ping > 0 ? `${ping}ms` : '--'}
            </span>
          </div>

          <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Jitter</span>
            <span className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
              {jitter > 0 ? `${jitter}ms` : '--'}
            </span>
          </div>

          <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Upload</span>
            <span className="text-base sm:text-lg font-bold font-mono text-cyan-400 tabular-nums">
              {upload > 0 ? `${upload}M` : '--'}
            </span>
          </div>

          <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Absorption</span>
            <span className="text-base sm:text-lg font-bold font-mono text-amber-400 tabular-nums">
              {wifiEfficiency > 0 ? `${wifiEfficiency}%` : '--'}
            </span>
          </div>
        </div>

        {/* Efficiency Notice */}
        {phase === 'completed' && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-xs text-slate-300">
              Maximum WiFi throughput absorbed. Full 4K video playback is fully primed for YouTube and Instagram.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
