import { AppShortcut } from '../types/vpn';

export const APP_SHORTCUTS: AppShortcut[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Streaming & Video',
    color: 'from-red-600 to-rose-700',
    url: 'https://www.youtube.com',
    description: 'Stream 4K/HD video without buffering via ultra-fast VPN proxy tunnel',
    badge: '4K Ultra HD',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Social & Media',
    color: 'from-pink-600 via-purple-600 to-amber-500',
    url: 'https://www.instagram.com',
    description: 'Browse photos, reels, and direct messages with zero ISP throttling',
    badge: 'Full Speed',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    category: 'Real-Time News',
    color: 'from-neutral-800 to-neutral-950',
    url: 'https://x.com',
    description: 'Uncensored real-time global news feed and trending topics worldwide',
    badge: 'Unrestricted',
  },
  {
    id: 'google',
    name: 'Google Search',
    category: 'Web Search & Tools',
    color: 'from-blue-600 via-emerald-600 to-amber-500',
    url: 'https://www.google.com',
    description: 'Private unblocked search without ad profiling or location tracking',
    badge: 'Private Mode',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    category: 'Communities',
    color: 'from-orange-600 to-red-600',
    url: 'https://www.reddit.com',
    description: 'Access all discussions, subreddits, and media across blocked networks',
    badge: 'Global Access',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'Short Video',
    color: 'from-neutral-900 to-cyan-700',
    url: 'https://www.tiktok.com',
    description: 'Instant unblocked short video streaming with high-bitrate WiFi booster',
    badge: 'Turbo Stream',
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    category: 'Knowledge Base',
    color: 'from-slate-700 to-slate-900',
    url: 'https://www.wikipedia.org',
    description: 'Free encyclopedia knowledge repository with unrestricted global access',
    badge: 'Fast Reader',
  },
];

export interface YouTubePresetVideo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  embedId: string;
  category: string;
}

export const YOUTUBE_PRESETS: YouTubePresetVideo[] = [
  {
    id: 'yt-1',
    title: 'Earth from Space: Ultra HD 4K Relaxing Earth Views',
    channel: 'Space Exploration HQ',
    duration: '11:40',
    views: '4.8M views',
    embedId: 'EEIk7gwjgIM',
    category: 'Science & Earth',
  },
  {
    id: 'yt-2',
    title: 'High Speed WiFi & Network Architecture Explained',
    channel: 'TechCraft Academy',
    duration: '14:22',
    views: '1.2M views',
    embedId: 'akflz_w_Z4I',
    category: 'Technology',
  },
  {
    id: 'yt-3',
    title: 'Tokyo 4K Neon City Walk & Rain Atmosphere',
    channel: 'Nomadic Ambience',
    duration: '28:15',
    views: '6.5M views',
    embedId: 'gQpmAkyZvhM',
    category: 'Travel & Chill',
  },
  {
    id: 'yt-4',
    title: 'Cybersecurity & Quantum Cryptography in 2026',
    channel: 'Security Frontier',
    duration: '18:04',
    views: '930K views',
    embedId: 'lB_dI_bKx1c',
    category: 'Privacy',
  },
];

export interface InstagramPreviewPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  imageUrl: string;
  caption: string;
  likes: string;
  comments: string;
  tag: string;
}

export const INSTAGRAM_PREVIEWS: InstagramPreviewPost[] = [
  {
    id: 'ig-1',
    author: 'Aero Travel & Places',
    handle: 'aerotravel',
    avatar: 'AT',
    imageUrl: '/src/assets/images/ig_coastal_sunset_1793349332564.jpg',
    caption: 'Sunset over the Aegean coastline. Unlocked high-speed browsing through our Greece proxy node! 🌅✈️',
    likes: '42,108',
    comments: '382',
    tag: '#wanderlust #travel',
  },
  {
    id: 'ig-2',
    author: 'Cyber Architecture',
    handle: 'minimalarch',
    avatar: 'CA',
    imageUrl: '/src/assets/images/ig_minimal_architecture_1793349333091.jpg',
    caption: 'Minimalist glass cantilever in Zurich. Ultra clear latency on the Swiss server today. 📐✨',
    likes: '19,450',
    comments: '124',
    tag: '#architecture #design',
  },
  {
    id: 'ig-3',
    author: 'Future Tech & Gear',
    handle: 'futuregear',
    avatar: 'FT',
    imageUrl: '/src/assets/images/ig_tech_hardware_1793349333596.jpg',
    caption: 'Hardware setup with 10Gbps optic link & WireGuard encrypted routing. Blazing fast wifi absorption.',
    likes: '35,920',
    comments: '512',
    tag: '#tech #cyberpunk',
  },
];

export interface TwitterTrendingTopic {
  rank: number;
  topic: string;
  category: string;
  tweetsCount: string;
  sampleTweet: string;
  author: string;
  authorHandle: string;
}

export const TWITTER_TRENDING: TwitterTrendingTopic[] = [
  {
    rank: 1,
    topic: '#GlobalTechSummit',
    category: 'Technology · Trending',
    tweetsCount: '412.5K posts',
    sampleTweet: 'Keynote announcement: Next-generation optical Wi-Fi routers achieve unprecedented zero-packet-loss absorption rates across multi-story buildings.',
    author: 'Tech Wire Daily',
    authorHandle: '@techwiredaily',
  },
  {
    rank: 2,
    topic: '#InternetFreedom',
    category: 'World News · Trending',
    tweetsCount: '289.1K posts',
    sampleTweet: 'Privacy advocates report record utilization of independent encrypted VPN tunnels worldwide. Free open web access is an essential human right.',
    author: 'Open Web Coalition',
    authorHandle: '@openwebco',
  },
  {
    rank: 3,
    topic: '#SpaceMission2026',
    category: 'Science · Trending',
    tweetsCount: '178.4K posts',
    sampleTweet: 'Live telemetry shows lunar orbiter communications relaying scientific data at maximum throughput. High definition stream is now active.',
    author: 'Astro Research',
    authorHandle: '@astroresearch',
  },
  {
    rank: 4,
    topic: '#CyberDefense',
    category: 'Privacy & Security · Trending',
    tweetsCount: '95.2K posts',
    sampleTweet: 'Remember to verify encrypted DNS over HTTPS when connecting on public Wi-Fi. Always verify your masked virtual IP.',
    author: 'SecOps Intel',
    authorHandle: '@secopsintel',
  },
];
