import { Box, Typography, Avatar, styled, Grid } from '@mui/material';
import { Artist } from '../../../models/artist';
import { EllipsisText } from '../../../common/styles/text.styles';

interface ArtistsProps {
  artists: Artist[];
  onArtistClick?: (artist: Artist) => void;
}

const Artists = ({ artists, onArtistClick }: ArtistsProps) => {
  return (
    <>
      <Typography variant="h1">Artists</Typography>
      <Grid container spacing={2}>
        {artists.slice(0, 6).map((artist, index) => {
          const imageUrl = (artist as any).images?.[0]?.url;

          return (
            <Grid key={artist.id || index} size={{ xs: 6, sm: 4, md: 2 }} paddingTop="16px">
              <StyledArtistCard
                onClick={() => onArtistClick?.(artist)}
              >
                <StyledAvatar src={imageUrl || undefined}>
                  {!imageUrl && (
                    <Typography variant="caption" color="text.secondary">
                      No Image
                    </Typography>
                  )}
                </StyledAvatar>
                <StyledArtistName variant="h2" paddingTop="8px">
                  {artist.name || 'Unknown'}
                </StyledArtistName>
                <StyledType variant="body1" color="textSecondary">Artist</StyledType>
              </StyledArtistCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const StyledArtistCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '180px',
  padding: '16px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  marginBottom: '8px',
});

const StyledArtistName = styled(EllipsisText)({
  width: '100%',
  maxWidth: '165px',
});

const StyledType = styled(EllipsisText)({
  width: '100%',
  maxWidth: '165px',
});

export default Artists;

