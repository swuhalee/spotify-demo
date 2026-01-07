import { Box, Typography, styled } from '@mui/material';
import { useParams } from 'react-router';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import SearchResult from './components/SearchResult';
import PageLoader from '../../common/components/PageLoader';

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
  
  const hasSearchResults = firstPage && 
    ((firstPage.tracks?.items?.length ?? 0) > 0 || 
     (firstPage.artists?.items?.length ?? 0) > 0 || 
     (firstPage.albums?.items?.length ?? 0) > 0);

  return (
    <StyledContainer>
      {hasSearchResults && firstPage ? (
        <SearchResult data={firstPage} topTrack={topTrack} />
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

const StyledContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingY: '24px',
  overflow: 'auto',
});

export default SearchWithPage;
