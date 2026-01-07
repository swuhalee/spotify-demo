import { Box, styled } from '@mui/material';
import { SearchResponse } from '../../../models/search';
import { TrackObject } from '../../../models/track';
import TopResult from './TopResult';
import Songs from './Songs';
import Artists from './Artists';
import Albums from './Albums';

interface SearchResultProps {
  data: SearchResponse;
  topTrack?: TrackObject;
}

const SearchResult = ({ data, topTrack: propTopTrack }: SearchResultProps) => {
  const topTrack = propTopTrack || data.tracks?.items?.[0];
  const tracks = data.tracks?.items || [];
  const artists = data.artists?.items || [];
  const albums = data.albums?.items || [];

  const songsToShow = topTrack && tracks[0]?.id === topTrack.id
    ? tracks.slice(1, 5)
    : tracks.slice(0, 4);

  return (
    <StyledContainer>
      <Box sx={{ display: 'flex', gap: '24px', flexWrap: { xs: 'wrap', md: 'nowrap' }, mb: 5 }}>
        {topTrack && (
          <Box sx={{ flex: { xs: '1 1 100%', md: 1 } }}>
            <TopResult track={topTrack} />
          </Box>
        )}
        {songsToShow.length > 0 && (
          <Box sx={{ flex: { xs: '1 1 100%', md: 1 } }}>
            <Songs tracks={songsToShow} />
          </Box>
        )}
      </Box>

      {artists.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Artists artists={artists} />
        </Box>
      )}

      {albums.length > 0 && (
        <Box>
          <Albums albums={albums} />
        </Box>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '24px',
  backgroundColor: 'transparent',
});

export default SearchResult;