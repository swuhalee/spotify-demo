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

  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || "No name"}</TableCell>
      <TableCell>{isEpisode(item.track) ? "N/A": item.track.album?.name}</TableCell>
      <TableCell>{item.added_at || "Unknown"}</TableCell>
      <TableCell>{item.track.duration_ms || "Unknown"}</TableCell>
    </TableRow>
  )
}

export default DesktopPlaylistItem