
import { searchItunes } from "../services/itune.service";
import {
  upsertPodcasts,
  findPodcastsByTerm,
} from "../services/podcast.service";

export async function searchPodcastHandler(req: any, res: any) {
  try {
    const term = (req.query.term || "").toString().trim();
    if (!term) {
      return res.status(400).json({ message: "term is required" });
    }
    const itunesResults = await searchItunes(term);
    await upsertPodcasts(itunesResults);
    const stored = await findPodcastsByTerm(term);
    return res.json(stored);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
