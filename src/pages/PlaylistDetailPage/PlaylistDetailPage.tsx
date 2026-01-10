import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Navigate, useParams } from 'react-router';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import PlaylistHeader from './components/PlaylistHeader';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import LoginButton from '../../common/components/LoginButton';
import ErrorMessage from '../../common/components/ErrorMessage';
import EmptyPlaylistWithSearch from './components/EmptyPlaylistWithSearch';
import PageLoader from '../../common/components/PageLoader';
import axios from 'axios';
import DesktopPlaylistTable from './components/DesktopPlaylistTable';
import MobilePlaylistItem from './components/MobilePlaylistItem';

const PlaylistDetailPage = () => {
  const { ref, inView } = useInView();
  const { id } = useParams<{ id: string }>();
  
  const {
    data: playlist,
    error: playlistError,
    isLoading: isPlaylistLoading,
  } = useGetPlaylist({ playlist_id: id || '' });

  const {
    data: playlistItems,
    error: playlistItemsError,
    isLoading: isPlaylistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id || '', limit: PAGE_LIMIT });

  const isLoading = isPlaylistLoading || isPlaylistItemsLoading;
  const error = playlistError || playlistItemsError;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (id === undefined) {
    return <Navigate to={'/'} />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    const isAxiosError = axios.isAxiosError(error);

    if (isAxiosError) {
      if (error.response?.status === 401) {
        return (
          <AgainSignInContainer>
            <Typography variant='h2' fontSize={'24px'} fontWeight={700}>
              Please Sign in again.
            </Typography>
            <LoginButton />
          </AgainSignInContainer>
        );
      }
    }

    return <ErrorMessage errorMessage={error?.message || ''} />
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <PlaylistHeader playlist={playlist} />
      <Box sx={{ overflow: "hidden", marginTop: "16px", height: "100%" }}>
        {playlist?.tracks?.total === 0
          ? <EmptyPlaylistWithSearch />
          : (
            <>
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  height: "100%",
                }}
              >
                <DesktopPlaylistTable playlistItems={playlistItems} ref={ref} />
              </Box>
              
              <Box
                sx={{
                  display: { xs: 'block', md: 'none' },
                  height: "100%",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    display: "none"
                  },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none"
                }}
              >
                {playlistItems?.pages.map((page, pageIndex) => 
                  page.items.map((item, itemIndex) => (
                    <MobilePlaylistItem
                      key={`${item.track.id || pageIndex}-${itemIndex}`}
                      item={item}
                    />
                  ))
                )}
                <Box sx={{ height: "4px" }} ref={ref} />
              </Box>
            </>
          )
        }
      </Box>
    </Box>
  )
}

const AgainSignInContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  gap: "16px",
});

export default PlaylistDetailPage
