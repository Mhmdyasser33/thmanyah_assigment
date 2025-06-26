
import React, { useState } from 'react';
import { Search, Music, Film, Tv, Book, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ITunesProgram {
  id: string;
  wrapper_type: string;
  kind: string;
  collection_id: number;
  track_id: number;
  artist_name: string;
  collection_name: string;
  track_name: string;
  collection_censored_name: string;
  track_censored_name: string;
  collection_artist_id: number;
  collection_artist_view_url: string;
  collection_view_url: string;
  track_view_url: string;
  preview_url: string;
  artwork_url_30: string;
  artwork_url_60: string;
  artwork_url_100: string;
  collection_price: number;
  track_price: number;
  track_rental_price: number;
  collection_hd_price: number;
  track_hd_price: number;
  track_hd_rental_price: number;
  release_date: string;
  collection_explicitness: string;
  track_explicitness: string;
  disc_count: number;
  disc_number: number;
  track_count: number;
  track_number: number;
  track_time_millis: number;
  country: string;
  currency: string;
  primary_genre_name: string;
  content_advisory_rating: string;
  short_description: string;
  long_description: string;
  has_itunes_extras: boolean;
  search_term: string;
  created_at: string;
  updated_at: string;
}

interface SearchResponse {
  success: boolean;
  searchTerm: string;
  totalResults: number;
  programs: ITunesProgram[];
}

const ITunesSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['itunes-search', currentSearch],
    queryFn: async (): Promise<SearchResponse> => {
      if (!currentSearch) return { success: true, searchTerm: '', totalResults: 0, programs: [] };
      
      const response = await fetch(
        `https://ppzctdbyanfoaavvufyd.supabase.co/functions/v1/itunes-search?term=${encodeURIComponent(currentSearch)}`,
        {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwemN0ZGJ5YW5mb2FhdnZ1ZnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTA1NDksImV4cCI6MjA2NTc2NjU0OX0.KTyw_qv2WlFZGx6clr3hmoTpLb49YwhcetbK3mRi1nI`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to search iTunes');
      }
      
      return response.json();
    },
    enabled: !!currentSearch,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCurrentSearch(searchTerm.trim());
      toast.success(`Searching for "${searchTerm.trim()}"...`);
    }
  };

  const getKindIcon = (kind: string) => {
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

  const formatPrice = (price: number, currency: string = 'USD') => {
    if (!price) return 'Free';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const formatDuration = (millis: number) => {
    if (!millis) return '';
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">iTunes Search</h1>
          <p className="text-lg text-gray-600">Search and discover content from the iTunes Store</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for movies, music, TV shows, books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-lg py-3"
                />
              </div>
              <Button type="submit" size="lg" disabled={isLoading || !searchTerm.trim()}>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Search className="w-5 h-5 mr-2" />
                )}
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">Error: {error.message}</p>
            </CardContent>
          </Card>
        )}

        {data && data.programs && data.programs.length > 0 && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Search Results for "{data.searchTerm}"
              </h2>
              <p className="text-gray-600">{data.totalResults} results found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.programs.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      {program.artwork_url_100 && (
                        <img
                          src={program.artwork_url_100}
                          alt={program.track_name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg line-clamp-2">
                          {program.track_name}
                        </CardTitle>
                        {program.artist_name && (
                          <p className="text-gray-600 text-sm mt-1">{program.artist_name}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getKindIcon(program.kind)}
                        {program.kind?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown'}
                      </Badge>
                      {program.primary_genre_name && (
                        <Badge variant="outline">{program.primary_genre_name}</Badge>
                      )}
                    </div>

                    {program.short_description && (
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {program.short_description}
                      </p>
                    )}

                    <div className="flex justify-between items-center text-sm">
                      {program.track_price && (
                        <span className="font-semibold text-green-600">
                          {formatPrice(program.track_price, program.currency)}
                        </span>
                      )}
                      {program.track_time_millis && (
                        <span className="text-gray-500">
                          {formatDuration(program.track_time_millis)}
                        </span>
                      )}
                    </div>

                    {program.release_date && (
                      <p className="text-xs text-gray-500">
                        Released: {new Date(program.release_date).getFullYear()}
                      </p>
                    )}

                    <div className="flex gap-2">
                      {program.track_view_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a 
                            href={program.track_view_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            View in iTunes
                          </a>
                        </Button>
                      )}
                      {program.preview_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a 
                            href={program.preview_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            Preview
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {data && data.programs && data.programs.length === 0 && currentSearch && !isLoading && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600">No results found for "{currentSearch}". Try a different search term.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ITunesSearch;
