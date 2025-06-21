import { useState } from "react";
import type { Podcast } from "../types/podcast";
import { toast } from "sonner";

export const usePodcastSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("يرجى إدخال كلمة البحث");
      return;
    }
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(
        `/api/podcasts?term=${encodeURIComponent(searchTerm)}`
      );
      if (!res.ok) throw new Error("Failed");
      const data: Podcast[] = await res.json();
      if (data.length) {
        setPodcasts(data);
        toast.success(`تم العثور على ${data.length} بودكاست`);
      } else {
        setPodcasts([]);
        toast.info("لم يتم العثور على نتائج للبحث المحدد");
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى");
      setPodcasts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    podcasts,
    isLoading,
    hasSearched,
    handleSearch,
  };
};
