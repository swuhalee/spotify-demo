import { Box, Typography, IconButton, styled } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';
import Playlist from '../../layout/components/Playlist';
import EmptyPlaylist from '../../layout/components/EmptyPlaylist';
import PlaylistSkeleton from '../../layout/components/PlaylistSkeleton';

const PlaylistPage = () => {
  const { ref, inView } = useInView();
  const { data: userProfile } = useGetCurrentUserProfile();
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({ 
    limit: 20, 
    offset: 0 
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: 'New Playlist' });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledHeaderLeft>
          <BookmarkIcon sx={{ color: 'text.primary' }} />
          <Typography variant="h1" fontWeight={700}>
            Your Library
          </Typography>
        </StyledHeaderLeft>
        <IconButton 
          color="primary" 
          onClick={handleCreatePlaylist}
          sx={{ 
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </StyledHeader>

      <StyledContent>
        {isLoading ? (
          <PlaylistSkeleton />
        ) : (
          <>
            {!data || data?.pages[0].total === 0 ? (
              <EmptyPlaylist />
            ) : (
              <StyledPlaylistList>
                {data?.pages.map((page, index) => (
                  <Playlist key={index} playlists={page.items} />
                ))}
                <div ref={ref} style={{ height: '4px' }} />
              </StyledPlaylistList>
            )}
          </>
        )}
      </StyledContent>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: 1,
  overflow: 'hidden',
});

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  paddingBottom: '16px',
}));

const StyledHeaderLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

const StyledContent = styled(Box)({
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
});

const StyledPlaylistList = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

export default PlaylistPage;
