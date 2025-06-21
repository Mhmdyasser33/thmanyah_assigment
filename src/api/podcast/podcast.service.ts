
import { ItunesItem } from "./itune.service";
import { podcastModel } from "../models/podcast";


export async function upsertPodcasts(items: ItunesItem[]) {
  const result = items.map((item) => ({
    updateOne: {
      filter: { collectionId: item.collectionId },
      update: { $setOnInsert: item },
      upsert: true,
    },
  }));
  return podcastModel.bulkWrite(result);
}


export function findPodcastsByTerm(term: string) {
  return podcastModel.find({ collectionName: new RegExp(term, "i") });
}
