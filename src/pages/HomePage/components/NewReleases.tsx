import { Grid, Typography } from '@mui/material'
import useGetNewReleases from '../../../hooks/useGetNewReleases'
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';
import CardSkeleton from '../../../common/components/CardSkeleton';

const NewReleases = () => {
  const { data, isLoading, isError, error } = useGetNewReleases();

  return (
    <>
      <Typography variant="h1" paddingTop="24px">New Released Albums</Typography>
      
      {isLoading && (
        <Grid container spacing={2} marginTop="8px">
          {[...Array(6)].map((_, index) => (
            <Grid key={index} size={{ xs: 6, sm: 4, md: 2 }} paddingTop="16px">
              <CardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {isError && (
        <div style={{ marginTop: '8px' }}>
          <ErrorMessage errorMessage={error.message} />
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {data && data?.albums.items.length > 0 ? (
            <Grid container spacing={2} marginTop="8px">
              {data.albums.items.map((album) => (
                <Grid key={album.id} size={{ xs: 6, sm: 4, md: 2 }} paddingTop="16px">
                  <Card name={album.name} image={album.images[0]?.url} artistName={album.artists.map(artist => artist.name).filter((name): name is string => Boolean(name))} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h2">No new releases available.</Typography>
          )}
        </>
      )}
    </>
  )
}

export default NewReleases
