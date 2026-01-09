import { Grid, Typography } from '@mui/material'
import { TrackObject } from '../../../models/track';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';
import CardSkeleton from '../../../common/components/CardSkeleton';

interface TracksProps {
  tracks: TrackObject[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

const Tracks = ({ tracks, isLoading, isError, error }: TracksProps) => {
  return (
    <>
      <Typography variant="h1" paddingTop="24px">Tracks</Typography>
      
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
          <ErrorMessage errorMessage={error?.message || 'Failed to load tracks'} />
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {tracks && tracks.length > 0 ? (
            <Grid container spacing={2}>
              {tracks.map((track) => {
                const imageUrl = track.album?.images?.[0]?.url || track.album?.images?.[track.album.images.length - 1]?.url || '';
                const artistNames = track.artists?.map(artist => artist.name).filter((name): name is string => Boolean(name)) || [];

                return (
                  <Grid key={track.id} size={{ xs: 6, sm: 4, md: 2 }} paddingTop="16px">
                    <Card 
                      name={track.name || 'Unknown Track'} 
                      image={imageUrl} 
                      artistName={artistNames} 
                    />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography variant="h2">No tracks available.</Typography>
          )}
        </>
      )}
    </>
  )
}

export default Tracks
