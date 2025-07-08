import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { getKindIcon, formatPrice, formatDuration } from './utils';
import { ITunesProgram } from '../types/itunes';

const ResultCard: React.FC<{ program: ITunesProgram}> = ({ program }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardHeader className="pb-3">
      <div className="flex items-start gap-3">
        {program.artwork_url_100 && (
          <img
            src={program.artwork_url_100}
            alt={program.track_name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg line-clamp-2">{program.track_name}</CardTitle>
          {program.artist_name && (
            <p className="text-gray-600 text-sm mt-1">{program.artist_name}</p>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className="flex items-center gap-1">
          {getKindIcon(program.kind)}
          {program.kind?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown'}
        </Badge>
        {program.primary_genre_name && (
          <Badge variant="outline">{program.primary_genre_name}</Badge>
        )}
      </div>

      {program.short_description && (
        <p className="text-sm text-gray-600 line-clamp-3">{program.short_description}</p>
      )}

      <div className="flex justify-between items-center text-sm">
        {program.track_price && (
          <span className="font-semibold text-green-600">
            {formatPrice(program.track_price, program.currency)}
          </span>
        )}
        {program.track_time_millis && (
          <span className="text-gray-500">{formatDuration(program.track_time_millis)}</span>
        )}
      </div>

      {program.release_date && (
        <p className="text-xs text-gray-500">Released: {new Date(program.release_date).getFullYear()}</p>
      )}

      <div className="flex gap-2">
        {program.track_view_url && (
          <Button size="sm" variant="outline" asChild>
            <a href={program.track_view_url} target="_blank" rel="noopener noreferrer" className="flex-1">
              View in iTunes
            </a>
          </Button>
        )}
        {program.preview_url && (
          <Button size="sm" variant="outline" asChild>
            <a href={program.preview_url} target="_blank" rel="noopener noreferrer" className="flex-1">
              Preview
            </a>
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export default ResultCard;
