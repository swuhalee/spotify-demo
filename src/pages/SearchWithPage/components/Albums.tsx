import { Box, Typography, styled } from '@mui/material';
import { SimplifiedAlbumObject } from '../../../models/album';
import Card from '../../../common/components/Card';

interface AlbumsProps {
  albums: SimplifiedAlbumObject[];
  onAlbumClick?: (album: SimplifiedAlbumObject) => void;
}

const Albums = ({ albums, onAlbumClick }: AlbumsProps) => {
  return (
    <StyledContainer>
      <Typography variant="h1" fontWeight={700} sx={{ marginBottom: '16px' }}>
        Albums
      </Typography>
      <StyledScrollContainer>
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
      </StyledScrollContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledScrollContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
  overflowX: 'auto',
  paddingBottom: '8px',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

const StyledAlbumCard = styled(Box)({
  minWidth: '180px',
  cursor: 'pointer',
});

export default Albums;

