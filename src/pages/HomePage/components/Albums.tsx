import { Grid, Typography } from '@mui/material'
import { SimplifiedAlbumObject } from '../../../models/album';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';
import CardSkeleton from '../../../common/components/CardSkeleton';

interface AlbumsProps {
  albums: SimplifiedAlbumObject[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

const Albums = ({ albums, isLoading, isError, error }: AlbumsProps) => {
  return (
    <>
      <Typography variant="h1" paddingTop="24px">Albums</Typography>
      
      {isLoading && (
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid key={index} size={{ xs: 6, sm: 4, md: 2 }} paddingTop="16px">
              <CardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {isError && (
        <div style={{ marginTop: '8px' }}>
          <ErrorMessage errorMessage={error?.message || 'Failed to load albums'} />
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {albums && albums.length > 0 ? (
            <Grid container spacing={2}>
              {albums.map((album) => {
                const imageUrl = album.images?.[0]?.url || album.images?.[album.images.length - 1]?.url || '';
                const artistNames = album.artists?.map(artist => artist.name).filter((name): name is string => Boolean(name)) || [];

                return (
                  <Grid key={album.id} size={{ xs: 6, sm: 4, md: 2 }} paddingTop="16px">
                    <Card 
                      name={album.name || 'Unknown Album'} 
                      image={imageUrl} 
                      artistName={artistNames} 
                    />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography variant="h2">No albums available.</Typography>
          )}
        </>
      )}
    </>
  )
}

export default Albums


