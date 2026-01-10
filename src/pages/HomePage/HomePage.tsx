import NewReleases from "./components/NewReleases"
import Tracks from "./components/Tracks"
import Albums from "./components/Albums"
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import { styled } from '@mui/material';

const HomePage = () => {
  const { data, isLoading, isError, error } = useSearchItemsByKeyword({
    q: 'pop',
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album],
    limit: 6,
  });

  const firstPage = data?.pages?.[0];
  const tracks = firstPage?.tracks?.items || [];
  const albums = firstPage?.albums?.items || [];

  return (
    <StyledContainer>
      <NewReleases />
      <Tracks tracks={tracks} isLoading={isLoading} isError={isError} error={error} />
      <Albums albums={albums} isLoading={isLoading} isError={isError} error={error} />
    </StyledContainer>
  )
}

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

export default HomePage
