import mongoose from "mongoose"

const podcastSchema = new mongoose.Schema({
  trackId: { type: Number, required: true, unique: true },
  artistName: { type: String, required: true },
  collectionName: { type: String, required: true },
  artworkUrl60 : {type : String},
  feedUrl : {type : String}
},{timestamps : true});


podcastSchema.index({trackId : 1} , {unique : true})

export const podcastModel = mongoose.model('Podcast',podcastSchema) ; 