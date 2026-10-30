import React, { useState, useMemo } from 'react';
import { Search, Globe, Zap, Check, ArrowDownUp } from 'lucide-react';
import { VpnServer, Region, ConnectionState } from '../types/vpn';
import { SERVERS } from '../data/servers';

interface ServerListProps {
  activeServer: VpnServer;
  onSelectServer: (server: VpnServer) => void;
  connectionState: ConnectionState;
}

export const ServerList: React.FC<ServerListProps> = ({
  activeServer,
  onSelectServer,
  connectionState,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [sortBy, setSortBy] = useState<'ping' | 'load' | 'name'>('ping');

  const filteredServers = useMemo(() => {
    return SERVERS.filter((server) => {
      const matchesSearch =
        server.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.countryCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        selectedRegion === 'all' || server.region === selectedRegion;

      return matchesSearch && matchesRegion;
    }).sort((a, b) => {
      if (sortBy === 'ping') return a.ping - b.ping;
      if (sortBy === 'load') return a.load - b.load;
      return a.country.localeCompare(b.country);
    });
  }, [searchQuery, selectedRegion, sortBy]);

  const fastestServer = useMemo(() => {
    return [...SERVERS].sort((a, b) => a.ping - b.ping)[0];
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Free Global Server Network</span>
            <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              {SERVERS.length} Free Locations
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Connect to any country with 100% free unlimited bandwidth and WireGuard protocol.
          </p>
        </div>

        {/* Auto Select Fastest Button */}
        <button
          onClick={() => onSelectServer(fastestServer)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer shadow-sm"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Auto-Pick Fastest ({fastestServer.country} {fastestServer.ping}ms)</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        {/* Search input */}
        <div className="relative md:col-span-5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country (e.g. United States, Japan, Germany)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Region Filter Segmented Control */}
        <div className="md:col-span-5 flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto text-xs">
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedRegion === 'all'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({SERVERS.length})
          </button>
          <button
            onClick={() => setSelectedRegion('americas')}
            className={`px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedRegion === 'americas'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Americas
          </button>
          <button
            onClick={() => setSelectedRegion('europe')}
            className={`px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedRegion === 'europe'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Europe
          </button>
          <button
            onClick={() => setSelectedRegion('asia')}
            className={`px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedRegion === 'asia'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Asia-Pacific
          </button>
          <button
            onClick={() => setSelectedRegion('mideast-africa')}
            className={`px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedRegion === 'mideast-africa'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Middle East & Africa
          </button>
        </div>

        {/* Sort selector */}
        <div className="md:col-span-2 flex items-center gap-1.5 justify-end">
          <ArrowDownUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-2 focus:outline-none focus:border-emerald-500/60"
          >
            <option value="ping">Lowest Ping</option>
            <option value="load">Lowest Server Load</option>
            <option value="name">Country Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Server Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredServers.map((server) => {
          const isSelected = activeServer.id === server.id;

          return (
            <div
              key={server.id}
              onClick={() => onSelectServer(server)}
              className={`p-3.5 rounded-xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer group ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/80 ring-1 ring-emerald-500/50'
                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl sm:text-3xl shrink-0" role="img" aria-label={server.country}>
                  {server.flag}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-semibold text-sm text-white truncate">
                      {server.country}
                    </span>
                    <span className="text-xs text-slate-400 shrink-0">
                      · {server.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                      {server.ping}ms
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-slate-400">
                      Load {server.load}%
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {server.protocols[0]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5">
                {isSelected ? (
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <button className="px-2.5 py-1 text-xs text-slate-400 group-hover:text-white bg-slate-800 rounded group-hover:bg-slate-700 transition-colors">
                    Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredServers.length === 0 && (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl my-6">
          <Globe className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-300 font-medium">No VPN servers found</p>
          <p className="text-xs text-slate-500 mt-1">Try another search query or switch region filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
            }}
            className="mt-3 px-3 py-1.5 bg-slate-800 text-xs text-slate-300 hover:text-white rounded"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
