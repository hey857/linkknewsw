/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VpnDial } from './components/VpnDial';
import { ServerList } from './components/ServerList';
import { AppsLauncher } from './components/AppsLauncher';
import { SpeedTestModal } from './components/SpeedTestModal';
import { TurboSettings } from './components/TurboSettings';
import { ProxyBrowserBar } from './components/ProxyBrowserBar';
import { MobileNav } from './components/MobileNav';
import { ConnectionState, VpnServer, TurboConfig } from './types/vpn';
import { SERVERS } from './data/servers';

export default function App() {
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [activeServer, setActiveServer] = useState<VpnServer>(SERVERS[0]); // default US New York
  const [activeTab, setActiveTab] = useState<'connect' | 'servers' | 'apps' | 'turbo'>('connect');
  const [isSpeedTestOpen, setIsSpeedTestOpen] = useState(false);

  // Turbo settings state
  const [turboConfig, setTurboConfig] = useState<TurboConfig>({
    wifiMultiSocket: true,
    adBlocker: true,
    dnsOptimizer: 'cloudflare',
    dataCompression: true,
    tcpBbr: true,
    killSwitch: true,
  });

  // Dynamic live speed calculations based on turbo config and connection
  const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
  const [uploadSpeed, setUploadSpeed] = useState<number>(0);
  const [wifiAbsorbedEfficiency, setWifiAbsorbedEfficiency] = useState<number>(94.5);

  // Dynamic network fluctuation simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (connectionState === 'connected') {
      interval = setInterval(() => {
        // Base download is 120-180 Mbps boosted by wifiMultiSocket
        const boostMultiplier = turboConfig.wifiMultiSocket ? 1.4 : 1.0;
        const compressionBonus = turboConfig.dataCompression ? 1.15 : 1.0;
        const baseDl = (90 + Math.random() * 45) * boostMultiplier * compressionBonus;
        const baseUl = baseDl * 0.38 + (Math.random() * 6 - 3);
        const efficiency = Math.min(99.8, 92 + (turboConfig.wifiMultiSocket ? 5.5 : 2.0) + Math.random() * 2);

        setDownloadSpeed(Number(baseDl.toFixed(1)));
        setUploadSpeed(Number(baseUl.toFixed(1)));
        setWifiAbsorbedEfficiency(Number(efficiency.toFixed(1)));
      }, 2000);
    } else {
      setDownloadSpeed(0);
      setUploadSpeed(0);
      setWifiAbsorbedEfficiency(94.2);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connectionState, turboConfig]);

  const handleToggleConnect = () => {
    if (connectionState === 'connected') {
      setConnectionState('disconnecting');
      setTimeout(() => {
        setConnectionState('disconnected');
      }, 600);
    } else if (connectionState === 'disconnected') {
      setConnectionState('connecting');
      setTimeout(() => {
        setConnectionState('connected');
      }, 1200);
    }
  };

  const handleSelectServer = (server: VpnServer) => {
    setActiveServer(server);
    if (connectionState === 'connected') {
      // Re-route smoothly
      setConnectionState('connecting');
      setTimeout(() => {
        setConnectionState('connected');
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 3-Zone Top Bar */}
      <Header
        connectionState={connectionState}
        activeServer={activeServer}
        onToggleConnect={handleToggleConnect}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wifiAbsorbedSpeed={downloadSpeed > 0 ? downloadSpeed : 124.6}
      />

      {/* Quick Unblocked Address Bar */}
      <ProxyBrowserBar
        activeServer={activeServer}
        isConnected={connectionState === 'connected'}
      />

      {/* Main Viewport Content based on activeTab */}
      <main className="flex-1 pb-24 md:pb-12">
        {activeTab === 'connect' && (
          <div className="animate-fade-in">
            <VpnDial
              connectionState={connectionState}
              activeServer={activeServer}
              onToggleConnect={handleToggleConnect}
              onOpenServerModal={() => setActiveTab('servers')}
              onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
              onOpenTurbo={() => setActiveTab('turbo')}
              turboConfig={turboConfig}
              downloadSpeed={downloadSpeed}
              uploadSpeed={uploadSpeed}
              wifiAbsorbedEfficiency={wifiAbsorbedEfficiency}
            />

            {/* Quick Apps Teaser Bar under dial */}
            <div className="max-w-4xl mx-auto px-4 mt-6">
              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-sm font-bold text-white">Unblocked Apps Ready</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Launch YouTube, Instagram, X (Twitter), and Google with 0% throttling.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('apps')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Open Apps Hub
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'servers' && (
          <div className="animate-fade-in">
            <ServerList
              activeServer={activeServer}
              onSelectServer={(server) => {
                handleSelectServer(server);
                setActiveTab('connect');
              }}
              connectionState={connectionState}
            />
          </div>
        )}

        {activeTab === 'apps' && (
          <div className="animate-fade-in">
            <AppsLauncher
              activeServer={activeServer}
              isConnected={connectionState === 'connected'}
              onConnectVpn={handleToggleConnect}
            />
          </div>
        )}

        {activeTab === 'turbo' && (
          <div className="animate-fade-in">
            <TurboSettings
              config={turboConfig}
              onChangeConfig={setTurboConfig}
              onRunSpeedTest={() => setIsSpeedTestOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Speed Test Modal */}
      <SpeedTestModal
        isOpen={isSpeedTestOpen}
        onClose={() => setIsSpeedTestOpen(false)}
        activeServer={activeServer}
        isConnected={connectionState === 'connected'}
      />

      {/* Mobile Bottom Thumb Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isConnected={connectionState === 'connected'}
      />

      {/* Quiet Footer */}
      <footer className="hidden md:block border-t border-slate-900 bg-slate-950 px-6 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>AeroShield Turbo VPN</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Logs Encrypted Routing</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono">100% Free Tier</span>
          </div>
          <div className="text-slate-600 font-mono text-[11px]">
            Compatible with Mobile, Tablet & Desktop · WireGuard Protocol
          </div>
        </div>
      </footer>
    </div>
  );
}
