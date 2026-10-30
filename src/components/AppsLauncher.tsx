import React, { useState } from 'react';
import {
  ExternalLink,
  Search,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Repeat,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Check,
  Maximize2,
} from 'lucide-react';
import { VpnServer } from '../types/vpn';
import {
  APP_SHORTCUTS,
  YOUTUBE_PRESETS,
  INSTAGRAM_PREVIEWS,
  TWITTER_TRENDING,
  YouTubePresetVideo,
} from '../data/apps';

interface AppsLauncherProps {
  activeServer: VpnServer;
  isConnected: boolean;
  onConnectVpn: () => void;
}

export const AppsLauncher: React.FC<AppsLauncherProps> = ({
  activeServer,
  isConnected,
  onConnectVpn,
}) => {
  const [selectedApp, setSelectedApp] = useState<'youtube' | 'instagram' | 'twitter' | 'google'>('youtube');

  // YouTube state
  const [activeVideo, setActiveVideo] = useState<YouTubePresetVideo>(YOUTUBE_PRESETS[0]);
  const [ytSearchTerm, setYtSearchTerm] = useState('');

  // Google state
  const [googleQuery, setGoogleQuery] = useState('');
  const [googleResults, setGoogleResults] = useState<{ title: string; url: string; snippet: string }[]>([
    {
      title: 'Fastest Free VPN Network & Proxy Servers 2026',
      url: `https://${activeServer.country.toLowerCase().replace(/\s+/g, '')}.aeroshi-vpn.net/free-proxy`,
      snippet: `Browse unrestricted through ${activeServer.city}, ${activeServer.country} with 0% logging and high-speed WireGuard encryption.`,
    },
    {
      title: 'Global Internet Freedom Index & Unblocked Web Guide',
      url: 'https://openweb.org/freedom-report',
      snippet: 'Comprehensive analysis on bypassing regional ISP firewalls, streaming video without latency, and protecting user privacy.',
    },
    {
      title: 'High-Efficiency Wi-Fi Signal Optimization & Throughput',
      url: 'https://networking.standards.org/wifi-absorption',
      snippet: 'Techniques for maximizing WiFi bandwidth absorption, lowering packet buffer bloat, and accelerating streaming video.',
    },
  ]);

  // Instagram state
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [igSearchUser, setIgSearchUser] = useState('');

  // Twitter state
  const [likedTweets, setLikedTweets] = useState<Record<string, boolean>>({});
  const [retweetedTweets, setRetweetedTweets] = useState<Record<string, boolean>>({});

  const handleYtSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ytSearchTerm.trim()) return;
    const directUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ytSearchTerm)}`;
    window.open(directUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGoogleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleQuery.trim()) return;
    const directUrl = `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`;
    // Also update simulated results in-app for instant feedback
    setGoogleResults([
      {
        title: `${googleQuery} - Instant Search via ${activeServer.country} Node`,
        url: `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`,
        snippet: `Real-time query processed through encrypted gateway in ${activeServer.city}. Zero search history stored on ISP logs.`,
      },
      {
        title: `Comprehensive Guide & Overview: ${googleQuery}`,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(googleQuery)}`,
        snippet: `In-depth documentation, encyclopedic references, and technical definitions regarding ${googleQuery}.`,
      },
      {
        title: `Latest Discussions & Communities on ${googleQuery}`,
        url: `https://www.reddit.com/search/?q=${encodeURIComponent(googleQuery)}`,
        snippet: `Community discussions, real-user opinions, and user experiences shared regarding ${googleQuery}.`,
      },
    ]);
  };

  const toggleLikePost = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLikeTweet = (id: string) => {
    setLikedTweets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRetweet = (id: string) => {
    setRetweetedTweets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* VPN Banner if not connected */}
      {!isConnected && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">VPN Currently Disconnected</h4>
              <p className="text-xs text-slate-400">
                Connect now to tunnel your traffic through <span className="text-emerald-400">{activeServer.country} ({activeServer.city})</span> for unthrottled streaming.
              </p>
            </div>
          </div>
          <button
            onClick={onConnectVpn}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            Connect to {activeServer.country} Free
          </button>
        </div>
      )}

      {/* App Selector Tabs */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Unblocked Web Apps Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Open YouTube, Instagram, X (Twitter), and Google with dedicated in-app viewers and 1-click unblocked launch.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 hidden sm:flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <span>Tunnel:</span>
          <span className="text-emerald-400 font-semibold">{activeServer.flag} {activeServer.city}</span>
        </div>
      </div>

      {/* Top 4 Primary App Cards / Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {/* YouTube */}
        <button
          onClick={() => setSelectedApp('youtube')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedApp === 'youtube'
              ? 'bg-slate-900 border-red-500/80 ring-1 ring-red-500/50 shadow-md'
              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-red-400">YouTube</span>
            <span className="text-[10px] font-mono bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded">
              Active Player
            </span>
          </div>
          <div className="text-sm font-semibold text-white">Watch & Stream</div>
          <div className="text-xs text-slate-400 mt-1 line-clamp-1">Zero buffering 4K</div>
        </button>

        {/* Instagram */}
        <button
          onClick={() => setSelectedApp('instagram')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedApp === 'instagram'
              ? 'bg-slate-900 border-pink-500/80 ring-1 ring-pink-500/50 shadow-md'
              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-pink-400">Instagram</span>
            <span className="text-[10px] font-mono bg-pink-500/10 text-pink-400 px-1.5 py-0.5 rounded">
              Social Hub
            </span>
          </div>
          <div className="text-sm font-semibold text-white">Photos & Reels</div>
          <div className="text-xs text-slate-400 mt-1 line-clamp-1">Fast photo feed</div>
        </button>

        {/* Twitter / X */}
        <button
          onClick={() => setSelectedApp('twitter')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedApp === 'twitter'
              ? 'bg-slate-900 border-cyan-500/80 ring-1 ring-cyan-500/50 shadow-md'
              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200">X (Twitter)</span>
            <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded">
              Live Feed
            </span>
          </div>
          <div className="text-sm font-semibold text-white">World Trending</div>
          <div className="text-xs text-slate-400 mt-1 line-clamp-1">Real-time news</div>
        </button>

        {/* Google Search */}
        <button
          onClick={() => setSelectedApp('google')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedApp === 'google'
              ? 'bg-slate-900 border-blue-500/80 ring-1 ring-blue-500/50 shadow-md'
              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-400">Google</span>
            <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">
              Private Search
            </span>
          </div>
          <div className="text-sm font-semibold text-white">Web Explorer</div>
          <div className="text-xs text-slate-400 mt-1 line-clamp-1">No tracker profiling</div>
        </button>
      </div>

      {/* Main Selected App Active Workspace */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* ========================================================== */}
        {/* TAB 1: YOUTUBE HUB */}
        {/* ========================================================== */}
        {selectedApp === 'youtube' && (
          <div className="p-4 sm:p-6">
            {/* YouTube Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">YouTube In-App Player & Search</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>Routing: {activeServer.country} Node</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-mono">Stream Bitrate: 4K Boosted</span>
                  </div>
                </div>
              </div>

              {/* Direct Open in New Tab Button */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
              >
                <span>Launch YouTube Web App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Video Search Bar */}
            <form onSubmit={handleYtSearch} className="my-5 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={ytSearchTerm}
                  onChange={(e) => setYtSearchTerm(e.target.value)}
                  placeholder="Search YouTube (e.g. 4K nature, technology, music, sports)..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* In-App YouTube Active Video Player */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Main Embedded Player */}
              <div className="lg:col-span-8 flex flex-col gap-3">
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 shadow-lg">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.embedId}?autoplay=0&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <h4 className="text-base sm:text-lg font-bold text-white">{activeVideo.title}</h4>
                  <div className="flex items-center justify-between gap-4 mt-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">{activeVideo.channel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{activeVideo.views}</span>
                    </div>
                    <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Proxy Tunneled
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Curated Stream Playlist */}
              <div className="lg:col-span-4 flex flex-col gap-2.5">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Popular Streaming Channels
                </div>
                {YOUTUBE_PRESETS.map((vid) => {
                  const isActive = vid.id === activeVideo.id;
                  return (
                    <div
                      key={vid.id}
                      onClick={() => setActiveVideo(vid)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex gap-3 ${
                        isActive
                          ? 'bg-slate-800 border-red-500/80 text-white'
                          : 'bg-slate-950/50 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="w-20 h-14 bg-slate-900 rounded-md shrink-0 flex items-center justify-center relative overflow-hidden border border-slate-800">
                        <Play className="w-5 h-5 text-red-500 fill-current" />
                        <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 px-1 rounded text-white">
                          {vid.duration}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-semibold line-clamp-2 text-white leading-tight">
                          {vid.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 mt-1 truncate">{vid.channel}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{vid.views}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: INSTAGRAM EXPLORER */}
        {/* ========================================================== */}
        {selectedApp === 'instagram' && (
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 flex items-center justify-center text-white font-bold">
                  IG
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Instagram Web Explorer</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>Unthrottled CDN access</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-mono">Bypassing ISP restrictions</span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
              >
                <span>Launch Instagram Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Profile Lookup bar */}
            <div className="my-5 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={igSearchUser}
                  onChange={(e) => setIgSearchUser(e.target.value)}
                  placeholder="Look up username or hashtag (e.g. natgeo, nasa, photography)..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>
              <button
                onClick={() => {
                  if (igSearchUser.trim()) {
                    window.open(`https://www.instagram.com/${igSearchUser.replace('@', '')}`, '_blank', 'noopener,noreferrer');
                  }
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Open Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feed Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {INSTAGRAM_PREVIEWS.map((post) => {
                const isLiked = likedPosts[post.id];

                return (
                  <div key={post.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                    {/* Author header */}
                    <div className="p-3 flex items-center justify-between border-b border-slate-800/80">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-slate-950 text-xs font-bold">
                          {post.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white leading-none">
                            {post.author}
                          </p>
                          <p className="text-[11px] text-slate-400 leading-none mt-1">
                            @{post.handle}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                    </div>

                    {/* Image with fallback */}
                    <div className="relative aspect-square bg-slate-900 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="p-3 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleLikePost(post.id)}
                              className={`transition-colors cursor-pointer ${
                                isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                            <button className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                              <MessageCircle className="w-5 h-5" />
                            </button>
                            <button className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                              <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                          <span className="text-xs font-mono font-medium text-slate-300">
                            {post.likes} likes
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          <span className="font-semibold text-white mr-1.5">{post.handle}</span>
                          {post.caption}
                        </p>
                        <p className="text-xs text-cyan-400 mt-1">{post.tag}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
                        <span>{post.comments} comments</span>
                        <a
                          href={`https://www.instagram.com/${post.handle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-400 hover:underline flex items-center gap-1"
                        >
                          <span>Open in App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 3: TWITTER / X LIVE FEED */}
        {/* ========================================================== */}
        {selectedApp === 'twitter' && (
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-white font-bold text-lg">
                  𝕏
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">X (Twitter) Uncensored Feed</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>Global trending news & events</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-mono">Real-time gateway</span>
                  </div>
                </div>
              </div>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
              >
                <span>Launch X.com via VPN</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Trending topics list */}
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {TWITTER_TRENDING.map((trend) => {
                const tweetKey = `tweet-${trend.rank}`;
                const isLiked = likedTweets[tweetKey];
                const isRetweeted = retweetedTweets[tweetKey];

                return (
                  <div
                    key={trend.rank}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>{trend.category}</span>
                        <span className="font-mono">#{trend.rank} Worldwide</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{trend.topic}</h4>
                      <p className="text-xs font-mono text-cyan-400 mb-3">{trend.tweetsCount}</p>

                      <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 mb-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-semibold text-xs text-white">{trend.author}</span>
                          <span className="text-xs text-slate-500">{trend.authorHandle}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {trend.sampleTweet}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-4 text-xs">
                        <button
                          onClick={() => toggleLikeTweet(tweetKey)}
                          className={`flex items-center gap-1 transition-colors cursor-pointer ${
                            isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                          <span>{isLiked ? 'Liked' : 'Like'}</span>
                        </button>
                        <button
                          onClick={() => toggleRetweet(tweetKey)}
                          className={`flex items-center gap-1 transition-colors cursor-pointer ${
                            isRetweeted ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Repeat className="w-4 h-4" />
                          <span>{isRetweeted ? 'Reposted' : 'Repost'}</span>
                        </button>
                      </div>

                      <a
                        href={`https://x.com/search?q=${encodeURIComponent(trend.topic)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-300 hover:text-white flex items-center gap-1"
                      >
                        <span>View thread</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 4: GOOGLE SEARCH PORTAL */}
        {/* ========================================================== */}
        {selectedApp === 'google' && (
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  G
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Google Encrypted Search Gateway</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>Virtual Node: {activeServer.country}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-mono">Location Cloaked</span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
              >
                <span>Launch Google.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Google Search Bar */}
            <form onSubmit={handleGoogleSearch} className="my-6 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={googleQuery}
                  onChange={(e) => setGoogleQuery(e.target.value)}
                  placeholder="Search Google privately or type a URL..."
                  className="w-full pl-12 pr-28 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>

              {/* Quick suggestion tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
                <span>Try searching:</span>
                {['world weather', 'cybersecurity news', 'fast speed test', 'lunar eclipse'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setGoogleQuery(item);
                      const directUrl = `https://www.google.com/search?q=${encodeURIComponent(item)}`;
                      window.open(directUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="hover:text-blue-400 underline transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </form>

            {/* Instant Search Results Simulator */}
            <div className="max-w-3xl mx-auto space-y-4 pt-2">
              <div className="text-xs font-mono text-slate-400">
                Encrypted Query Results via {activeServer.city} Relay:
              </div>

              {googleResults.map((result, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[11px] font-mono text-emerald-400 block truncate mb-1">
                    {result.url}
                  </span>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-400 hover:text-blue-300 hover:underline block leading-tight mb-1.5"
                  >
                    {result.title}
                  </a>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {result.snippet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Quick-Launch Shortcuts for Reddit, TikTok, Wikipedia */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
          Additional Unblocked Shortcuts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {APP_SHORTCUTS.filter((app) => ['reddit', 'tiktok', 'wikipedia'].includes(app.id)).map((app) => (
            <div
              key={app.id}
              className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{app.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {app.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{app.description}</p>
              </div>

              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <span>Open</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
