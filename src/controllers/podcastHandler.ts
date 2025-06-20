import axios from "axios";
import { Request, Response } from "express";
export const searchPodcastHandler = async (req, res) => {
  try {
    const term = req.query.term;
    if (!term) {
      return res.status(400).json({
        message: "term is required",
      });
    } // integrate in front will be like t
   /*  try {
      const response = await axios.get(
        `https://itunes.apple.com/search?${term}`,
        {
          params: { term },
        }
      );
      const result = response.data;
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ message: "Error in connecting iTunes API" });
    } */
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
