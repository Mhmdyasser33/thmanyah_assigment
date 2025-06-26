
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
    
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS 
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const searchTerm = url.searchParams.get('term')

    if (!searchTerm) {
      return new Response(
        JSON.stringify({ error: 'Search term is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Call iTunes Search API
    const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&limit=50`
    const itunesResponse = await fetch(itunesUrl)
    const itunesData = await itunesResponse.json()

    console.log(`Found ${itunesData.results?.length || 0} results for "${searchTerm}"`)


    const programs = []
    
    if (itunesData.results && itunesData.results.length > 0) {
      for (const item of itunesData.results) {
        try {
        
          const program = {
            wrapper_type: item.wrapperType || null,
            kind: item.kind || null,
            collection_id: item.collectionId || null,
            track_id: item.trackId || null,
            artist_name: item.artistName || null,
            collection_name: item.collectionName || null,
            track_name: item.trackName || item.collectionName || 'Unknown',
            collection_censored_name: item.collectionCensoredName || null,
            track_censored_name: item.trackCensoredName || null,
            collection_artist_id: item.collectionArtistId || null,
            collection_artist_view_url: item.collectionArtistViewUrl || null,
            collection_view_url: item.collectionViewUrl || null,
            track_view_url: item.trackViewUrl || null,
            preview_url: item.previewUrl || null,
            artwork_url_30: item.artworkUrl30 || null,
            artwork_url_60: item.artworkUrl60 || null,
            artwork_url_100: item.artworkUrl100 || null,
            collection_price: item.collectionPrice || null,
            track_price: item.trackPrice || null,
            track_rental_price: item.trackRentalPrice || null,
            collection_hd_price: item.collectionHdPrice || null,
            track_hd_price: item.trackHdPrice || null,
            track_hd_rental_price: item.trackHdRentalPrice || null,
            release_date: item.releaseDate ? new Date(item.releaseDate).toISOString() : null,
            collection_explicitness: item.collectionExplicitness || null,
            track_explicitness: item.trackExplicitness || null,
            disc_count: item.discCount || null,
            disc_number: item.discNumber || null,
            track_count: item.trackCount || null,
            track_number: item.trackNumber || null,
            track_time_millis: item.trackTimeMillis || null,
            country: item.country || null,
            currency: item.currency || null,
            primary_genre_name: item.primaryGenreName || null,
            content_advisory_rating: item.contentAdvisoryRating || null,
            short_description: item.shortDescription || null,
            long_description: item.longDescription || null,
            has_itunes_extras: item.hasITunesExtras || false,
            search_term: searchTerm
          }

          // Insert or update program in database
          const { data, error } = await supabase
            .from('itunes_programs')
            .upsert(program, { 
              onConflict: 'track_id',
              ignoreDuplicates: false 
            })
            .select()

          if (error) {
            console.error('Database error:', error)
          } else if (data) {
            programs.push(data[0])
          }
        } catch (itemError) {
          console.error('Error processing item:', itemError)
        }
      }
    }

    // Fetch all stored programs for this search term
    const { data: storedPrograms, error: fetchError } = await supabase
      .from('itunes_programs')
      .select('*')
      .eq('search_term', searchTerm)
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Fetch error:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch stored programs' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        searchTerm,
        totalResults: storedPrograms?.length || 0,
        programs: storedPrograms || []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
