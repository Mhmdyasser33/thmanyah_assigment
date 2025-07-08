export const searchItunes = async (term: string) => {
  if (!term) return { success: true, searchTerm: '', totalResults: 0, programs: [] };

  const response = await fetch(
    `https://ppzctdbyanfoaavvufyd.supabase.co/functions/v1/itunes-search?term=${encodeURIComponent(term)}`,
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_ITUNES_API_KEY}`
      },
    }
  );
  console.warn('Your API Key:', import.meta.env.VITE_ITUNES_API_KEY);


  if (!response.ok) {
    throw new Error('Failed to search iTunes');
    
  }

  return response.json();
};
