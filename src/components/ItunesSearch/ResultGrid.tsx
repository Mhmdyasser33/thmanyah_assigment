import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ResultCard from './ResultCard';
import { SearchResponse } from '../types/itunes';


interface Props {
  data?: SearchResponse;
  isLoading: boolean;
  currentSearch: string;
}

const ResultGrid: React.FC<Props> = ({ data, isLoading, currentSearch }) => {
  if (!data || isLoading) return null;

  if (data.programs.length === 0 && currentSearch) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-gray-600">No results found for "{currentSearch}". Try a different search term.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Search Results for "{data.searchTerm}"
        </h2>
        <p className="text-gray-600">{data.totalResults} results found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.programs.map((program) => (
          <ResultCard key={program.id} program={program} />
        ))}
      </div>
    </>
  );
};

export default ResultGrid;
