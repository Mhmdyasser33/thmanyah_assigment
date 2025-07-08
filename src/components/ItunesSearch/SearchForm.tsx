import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  setCurrentSearch: (term: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<Props> = ({ setCurrentSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCurrentSearch(searchTerm.trim());
      toast.success(`Searching for "${searchTerm.trim()}"...`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-4 mb-8">
      <Input
        type="text"
        placeholder="Search for movies, music, TV shows, books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-lg py-3 flex-1"
      />
      <Button type="submit" size="lg" disabled={isLoading || !searchTerm.trim()}>
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Search className="w-5 h-5 mr-2" />}
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
