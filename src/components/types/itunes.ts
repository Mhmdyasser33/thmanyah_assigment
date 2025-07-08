export interface ITunesProgram {
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

export interface SearchResponse {
  success: boolean;
  searchTerm: string;
  totalResults: number;
  programs: ITunesProgram[];
}
