import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material';
import { BasePlaylistTrackObject } from '../../../models/playlist';
import { EpisodeObject, TrackObject } from '../../../models/track';
import { SquareAvatar } from '../../../common/styles/avatar.styles';
import { EllipsisText } from '../../../common/styles/text.styles';

interface MobilePlaylistItemProps {
  item: BasePlaylistTrackObject<TrackObject | EpisodeObject>;
}

const MobilePlaylistItem = ({ item }: MobilePlaylistItemProps) => {
  const isEpisode = (track: TrackObject | EpisodeObject): track is EpisodeObject => {
    return track.type === "episode";
  };

  const track = item.track;
  const trackName = track.name || 'Unknown Track';
  const artistNames = isEpisode(track) 
    ? 'Episode' 
    : track.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist';
  
  const albumImage = isEpisode(track)
    ? null
    : track.album?.images?.[0]?.url || track.album?.images?.[track.album.images.length - 1]?.url;

  return (
    <StyledMobilePlaylistItem>
      <SquareAvatar
        variant="square"
        src={albumImage || undefined}
      >
        {!albumImage && (
          <Typography variant="caption" color="text.secondary" fontSize="10px">
            No Image
          </Typography>
        )}
      </SquareAvatar>
      <StyledTextContainer>
        <StyledTrackName variant="body1">
          {trackName}
        </StyledTrackName>
        <StyledArtistName variant="subtitle1">
          {artistNames}
        </StyledArtistName>
      </StyledTextContainer>
    </StyledMobilePlaylistItem>
  );
};

const StyledMobilePlaylistItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 12px',
  borderRadius: '8px',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTextContainer = styled(Box)({
  flex: 1,
  minWidth: 0,
  width: 0,
  overflow: 'hidden',
});

const StyledTrackName = styled(EllipsisText)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

const StyledArtistName = styled(EllipsisText)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export default MobilePlaylistItem;

