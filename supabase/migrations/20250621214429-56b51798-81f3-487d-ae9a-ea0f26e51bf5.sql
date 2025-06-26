
-- Create a table to store iTunes search results
CREATE TABLE public.itunes_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wrapper_type TEXT,
  kind TEXT,
  collection_id BIGINT,
  track_id BIGINT UNIQUE,
  artist_name TEXT,
  collection_name TEXT,
  track_name TEXT NOT NULL,
  collection_censored_name TEXT,
  track_censored_name TEXT,
  collection_artist_id BIGINT,
  collection_artist_view_url TEXT,
  collection_view_url TEXT,
  track_view_url TEXT,
  preview_url TEXT,
  artwork_url_30 TEXT,
  artwork_url_60 TEXT,
  artwork_url_100 TEXT,
  collection_price DECIMAL(10,2),
  track_price DECIMAL(10,2),
  track_rental_price DECIMAL(10,2),
  collection_hd_price DECIMAL(10,2),
  track_hd_price DECIMAL(10,2),
  track_hd_rental_price DECIMAL(10,2),
  release_date TIMESTAMP WITH TIME ZONE,
  collection_explicitness TEXT,
  track_explicitness TEXT,
  disc_count INTEGER,
  disc_number INTEGER,
  track_count INTEGER,
  track_number INTEGER,
  track_time_millis BIGINT,
  country TEXT,
  currency TEXT,
  primary_genre_name TEXT,
  content_advisory_rating TEXT,
  short_description TEXT,
  long_description TEXT,
  has_itunes_extras BOOLEAN,
  search_term TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster searches
CREATE INDEX idx_itunes_programs_search_term ON public.itunes_programs(search_term);
CREATE INDEX idx_itunes_programs_track_id ON public.itunes_programs(track_id);
CREATE INDEX idx_itunes_programs_created_at ON public.itunes_programs(created_at DESC);

-- Enable Row Level Security (making it public for now since it's search data)
ALTER TABLE public.itunes_programs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to itunes programs" 
  ON public.itunes_programs 
  FOR SELECT 
  TO public
  USING (true);

-- Create policy to allow public insert access (for API endpoint)
CREATE POLICY "Allow public insert access to itunes programs" 
  ON public.itunes_programs 
  FOR INSERT 
  TO public
  WITH CHECK (true);
