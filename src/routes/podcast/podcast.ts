import { searchPodcastHandler } from "controllers/podcastHandler";
import express from "express";

export default(router : express.Router)=>{
    router.get('/search' , searchPodcastHandler);
}