import { TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material';
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
    <StyledTableRow>
      <StyledTableCell>{index}</StyledTableCell>
      <StyledTableCell>{item.track.name || "No name"}</StyledTableCell>
      <StyledTableCell>{isEpisode(item.track) ? "N/A": item.track.album?.name}</StyledTableCell>
      <StyledTableCell>{formatDate(item.added_at)}</StyledTableCell>
      <StyledTableCell>{formatDuration(item.track.duration_ms)}</StyledTableCell>
    </StyledTableRow>
  )
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td': { borderBottom: 0 },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)({
  borderBottom: 'none',
});

export default DesktopPlaylistItem