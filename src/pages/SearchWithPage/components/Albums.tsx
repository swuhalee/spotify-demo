import { Box, Grid, Typography, styled } from '@mui/material';
import { SimplifiedAlbumObject } from '../../../models/album';
import Card from '../../../common/components/Card';

interface AlbumsProps {
  albums: SimplifiedAlbumObject[];
  onAlbumClick?: (album: SimplifiedAlbumObject) => void;
}

const Albums = ({ albums, onAlbumClick }: AlbumsProps) => {
  return (
    <>
      <Typography variant="h1">Albums</Typography>

      <Grid container spacing={2}>
        {albums.slice(0, 6).map((album, index) => {
          const imageUrl = album.images?.[0]?.url || album.images?.[album.images.length - 1]?.url;
          const artistNames = album.artists?.map(artist => artist.name).filter((name): name is string => Boolean(name));

          return (
            <StyledAlbumCard
              key={album.id || index}
              onClick={() => onAlbumClick?.(album)}
            >
              <Card
                name={album.name || 'Unknown Album'}
                image={imageUrl || ''}
                artistName={artistNames}
              />
            </StyledAlbumCard>
          );
        })}
      </Grid>
    </>
  );
};

const StyledAlbumCard = styled(Box)({
  minWidth: '180px',
  cursor: 'pointer',
});

export default Albums;

