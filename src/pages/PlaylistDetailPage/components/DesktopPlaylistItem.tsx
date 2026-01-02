import { TableCell, TableRow } from '@mui/material';
import { BasePlaylistTrackObject } from '../../../models/playlist'
import { EpisodeObject, TrackObject } from '../../../models/track'

interface DesktopPlaylistItemProps {
  index: number;
  item: BasePlaylistTrackObject<TrackObject | EpisodeObject>;
}

const DesktopPlaylistItem = ({ index, item }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: TrackObject | EpisodeObject): track is EpisodeObject => {
    return track.type === "episode";
  }

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "Unknown";
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch {
      return "Unknown";
    }
  };

  const formatDuration = (durationMs: number | null | undefined): string => {
    if (!durationMs) return "Unknown";
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <TableRow
      sx={{
        '&:last-child td': { borderBottom: 0 },
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <TableCell sx={{ borderBottom: 'none' }}>{index}</TableCell>
      <TableCell sx={{ borderBottom: 'none' }}>{item.track.name || "No name"}</TableCell>
      <TableCell sx={{ borderBottom: 'none' }}>{isEpisode(item.track) ? "N/A": item.track.album?.name}</TableCell>
      <TableCell sx={{ borderBottom: 'none' }}>{formatDate(item.added_at)}</TableCell>
      <TableCell sx={{ borderBottom: 'none' }}>{formatDuration(item.track.duration_ms)}</TableCell>
    </TableRow>
  )
}

export default DesktopPlaylistItem