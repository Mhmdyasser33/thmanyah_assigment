import axios from "axios";

export interface ItunesItem {
  collectionId: number;
  collectionName: string;
  artistName: string;
  feedUrl?: string;
  artworkUrl100?: string;
  primaryGenreName?: string;
}

export async function searchItunes(term: string): Promise<ItunesItem[]> {
  const { data } = await axios.get("https://itunes.apple.com/search", {
    params: { term, media: "podcast" },
  });
  return data.results as ItunesItem[];
}
