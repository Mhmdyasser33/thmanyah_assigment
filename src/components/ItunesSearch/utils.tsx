import { Music, Film, Tv, Book } from 'lucide-react';

export const getKindIcon = (kind: string) => {
  switch (kind) {
    case 'feature-movie':
    case 'movie':
      return <Film className="w-4 h-4" />;
    case 'tv-episode':
    case 'tv-season':
      return <Tv className="w-4 h-4" />;
    case 'song':
    case 'music-video':
    case 'album':
      return <Music className="w-4 h-4" />;
    case 'ebook':
    case 'audiobook':
      return <Book className="w-4 h-4" />;
    default:
      return <Music className="w-4 h-4" />;
  }
};

export const formatPrice = (price: number, currency: string = 'USD') => {
  if (!price) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};

export const formatDuration = (millis: number) => {
  if (!millis) return '';
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
