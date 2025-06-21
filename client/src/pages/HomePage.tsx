import React from "react";
import { Search, Loader2 } from "lucide-react";
import { usePodcastSearch } from "../hooks/usePodcastSearch";
import PodcastCard from "../components/podcastCard"

const HomePage: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    podcasts,
    isLoading,
    hasSearched,
    handleSearch,
  } = usePodcastSearch();

  return (
    <section className="max-w-6xl mx-auto p-4">
      <form
        onSubmit={handleSearch}
        className="mb-8 flex gap-4 max-w-2xl mx-auto"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="ابحث عن البودكاست... مثل 'فنجان'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 w-full h-14 border-2 border-gray-200 focus:border-blue-500 rounded-md text-lg bg-white/80 backdrop-blur-sm transition-colors"
            dir="rtl"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="h-14 px-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              جاري البحث...
            </span>
          ) : (
            <span className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              بحث
            </span>
          )}
        </button>
      </form>

      {/* Messages */}
      {!hasSearched && !isLoading && (
        <p className="text-center text-gray-500">ابدأ البحث عن البودكاست</p>
      )}
      {isLoading && (
        <p className="text-center text-gray-500 flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          جاري جلب النتائج...
        </p>
      )}
      {hasSearched && !isLoading && podcasts.length === 0 && (
        <p className="text-center text-gray-500">لم يتم العثور على نتائج</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((p) => (
          <PodcastCard key={p.trackId} podcast={p} />
        ))}
      </div>
    </section>
  );
};
export default HomePage;
