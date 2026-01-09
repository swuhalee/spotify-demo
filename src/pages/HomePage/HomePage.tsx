import NewReleases from "./components/NewReleases"
import Tracks from "./components/Tracks"
import Albums from "./components/Albums"
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';

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
    <div style={{ height: '100%', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
      <NewReleases />
      <Tracks tracks={tracks} isLoading={isLoading} isError={isError} error={error} />
      <Albums albums={albums} isLoading={isLoading} isError={isError} error={error} />
    </div>
  )
}

export default HomePage
