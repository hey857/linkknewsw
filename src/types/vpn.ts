export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';

export type Region = 'all' | 'americas' | 'europe' | 'asia' | 'mideast-africa';

export interface VpnServer {
  id: string;
  country: string;
  city: string;
  countryCode: string;
  flag: string;
  region: Region;
  ping: number; // in ms
  load: number; // percentage 0-100
  ip: string;
  protocols: ('WireGuard' | 'OpenVPN' | 'IKEv2' | 'TurboVless')[];
  isFree: boolean;
  isPopular?: boolean;
  score: number;
}

export interface AppShortcut {
  id: 'youtube' | 'instagram' | 'twitter' | 'google' | 'reddit' | 'tiktok' | 'wikipedia';
  name: string;
  category: string;
  color: string;
  url: string;
  description: string;
  badge?: string;
}

export interface SpeedTestResult {
  ping: number;
  download: number;
  upload: number;
  jitter: number;
  wifiEfficiency: number;
}

export interface TurboConfig {
  wifiMultiSocket: boolean;
  adBlocker: boolean;
  dnsOptimizer: 'cloudflare' | 'google' | 'quad9';
  dataCompression: boolean;
  tcpBbr: boolean;
  killSwitch: boolean;
}
