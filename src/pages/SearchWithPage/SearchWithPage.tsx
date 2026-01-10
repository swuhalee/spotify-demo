import { Box, Typography, styled } from '@mui/material';
import { useParams } from 'react-router';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import PageLoader from '../../common/components/PageLoader';
import TopResult from './components/TopResult';
import Songs from './components/Songs';
import Artists from './components/Artists';
import Albums from './components/Albums';

const SearchWithPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';

  const { data, isLoading } = useSearchItemsByKeyword({
    q: decodedKeyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
    limit: 6,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  const firstPage = data?.pages?.[0];
  const topTrack = firstPage?.tracks?.items?.[0];
  const tracks = firstPage?.tracks?.items || [];
  const artists = firstPage?.artists?.items || [];
  const albums = firstPage?.albums?.items || [];

  const songsToShow = topTrack && tracks[0]?.id === topTrack.id
    ? tracks.slice(1, 5)
    : tracks.slice(0, 4);

  const hasSearchResults = firstPage &&
    ((firstPage.tracks?.items?.length ?? 0) > 0 ||
      (firstPage.artists?.items?.length ?? 0) > 0 ||
      (firstPage.albums?.items?.length ?? 0) > 0);

  return (
    <StyledContainer>
      {hasSearchResults && firstPage ? (
        <>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: "20px", mb: "16px" }}>
            {topTrack && (
              <Box sx={{ flex: { xs: 'none', md: 1 }, width: { xs: '100%', md: 'auto' } }}>
                <TopResult track={topTrack} />
              </Box>
            )}
            {songsToShow.length > 0 && (
              <Box sx={{ flex: { xs: 'none', md: 1 }, width: { xs: '100%', md: 'auto' } }}>
                <Songs tracks={songsToShow} />
              </Box>
            )}
          </Box>

          {artists.length > 0 && (
            <Artists artists={artists} />
          )}

          {albums.length > 0 && (
            <Albums albums={albums} />
          )}
        </>
      ) : (
        <Box sx={{ padding: '24px', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            No results for "{decodedKeyword}"
          </Typography>
        </Box>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled('div')({
  height: '100%',
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingTop: '4px',
  paddingBottom: '20px',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

export default SearchWithPage;
