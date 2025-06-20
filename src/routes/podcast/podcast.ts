import { searchPodcastHandler } from "../../controllers/podcast.controller";
import express from "express";

export default(router : express.Router)=>{
    router.get("/search", searchPodcastHandler);
}