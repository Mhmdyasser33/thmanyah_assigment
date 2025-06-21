import React from "react";
import { ExternalLink, User } from "lucide-react";
import { Podcast} from "../types/podcast";

interface Props { podcast: Podcast }

const PodcastCard: React.FC<Props> = ({ podcast }) => {
  const imageSrc = podcast.artworkUrl100 || "/placeholder.svg";

  return (
    <div className="group overflow-hidden rounded-lg bg-white/80 backdrop-blur-sm border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="p-6 flex items-start gap-4">
        <img
          src={imageSrc}
          alt={podcast.trackName ?? "Podcast Artwork"}
          className="w-20 h-20 rounded-lg object-cover shrink-0 group-hover:scale-110 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {podcast.trackName || "عنوان غير متوفر"}
          </h3>
          <div className="flex items-center text-gray-600 mb-3">
            <User className="h-4 w-4 mr-2 shrink-0" />
            <span className="text-sm truncate">{podcast.artistName || "غير معروف"}</span>
          </div>
          {podcast.trackViewUrl && (
            <a
              href={podcast.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              iTunes
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
