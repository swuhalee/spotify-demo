import { Box, Typography, styled } from '@mui/material';
import { TrackObject } from '../../../models/track';
import { SquareAvatar } from '../../../common/styles/avatar.styles';
import { EllipsisText } from '../../../common/styles/text.styles';

interface SongsProps {
  tracks: TrackObject[];
  onTrackClick?: (track: TrackObject) => void;
}

const Songs = ({ tracks, onTrackClick }: SongsProps) => {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <StyledContainer>
      <Typography variant="h1" fontWeight={700} sx={{ marginBottom: '16px' }}>
        Songs
      </Typography>
      <StyledList>
        {tracks.slice(0, 4).map((track, index) => {
          const imageUrl = track.album?.images?.[0]?.url || track.album?.images?.[track.album.images.length - 1]?.url;
          const artistNames = track.artists?.map(artist => artist.name).join(', ') || 'Unknown';

          return (
            <StyledListItem
              key={track.id || index}
              onClick={() => onTrackClick?.(track)}
            >
              <StyledLeftSection>
                <SquareAvatar variant="square" src={imageUrl || undefined}>
                  {!imageUrl && (
                    <Typography variant="caption" color="text.secondary" fontSize="10px">
                      No Image
                    </Typography>
                  )}
                </SquareAvatar>
                <StyledTrackInfo>
                  <StyledTrackName variant="h2">
                    {track.name || 'Unknown'}
                  </StyledTrackName>
                  <StyledArtistName variant="body1">
                    {artistNames}
                  </StyledArtistName>
                </StyledTrackInfo>
              </StyledLeftSection>
              <StyledDuration variant="body1">
                {formatDuration(track.duration_ms || 0)}
              </StyledDuration>
            </StyledListItem>
          );
        })}
      </StyledList>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const StyledListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledLeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
  minWidth: 0,
});

const StyledTrackInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  flex: 1,
});

const StyledTrackName = styled(EllipsisText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const StyledArtistName = styled(EllipsisText)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const StyledDuration = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: '8px',
}));

export default Songs;

