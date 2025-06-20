import mongoose from "mongoose"

const podcastSchema = new mongoose.Schema(
  {
    collectionId: { type: Number, unique: true },
    artistName: { type: String, required: true },
    collectionName: { type: String, required: true },
    artworkUrl60: { type: String },
    feedUrl: { type: String },
    primaryGenreName: { type: String }
  },
  { timestamps: true }
);


podcastSchema.index({trackId : 1} , {unique : true})

export const podcastModel = mongoose.model('Podcast',podcastSchema) ; 