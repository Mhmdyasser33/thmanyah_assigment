import React, { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { useItunesSearch } from '@/hooks/useItunesSearch';
import SearchForm from '../ItunesSearch/SearchForm';
import ResultGrid from '../ItunesSearch/ResultGrid';

export const ItunesSearch = () => {
  const [currentSearch, setCurrentSearch] = useState('');
  const { data, isLoading, error } = useItunesSearch(currentSearch);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">iTunes Search</h1>
          <p className="text-lg text-gray-600">Search and discover content from the iTunes Store</p>
        </div>

        <SearchForm setCurrentSearch={setCurrentSearch} isLoading={isLoading} />

        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">Error: {error.message}</p>
            </CardContent>
          </Card>
        )}

        <ResultGrid data={data} isLoading={isLoading} currentSearch={currentSearch} />
      </div>
    </div>
  );
};
