import { SearchResponse } from '@/components/types/itunes';
import { searchItunes } from '@/services/itunesApi';
import { useQuery } from '@tanstack/react-query';


export const useItunesSearch = (currentSearch: string) => {
  return useQuery<SearchResponse>({
    queryKey: ['itunes-search', currentSearch],
    queryFn: () => searchItunes(currentSearch),
    enabled: !!currentSearch,
  });
};
