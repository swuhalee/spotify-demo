import { Box } from "@mui/material";
import ErrorMessage from "../../common/components/ErrorMessage";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";
import Playlist from "./Playlist";
import PlaylistSkeleton from './PlaylistSkeleton';
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Library = () => {
    const { ref, inView } = useInView();
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({ limit: 20, offset: 0 });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    if (isLoading) {
        return (
            <PlaylistSkeleton />
        );
    }

    return (
        <>
            {!data || data?.pages[0].total === 0
                ? <EmptyPlaylist />
                : <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
                    {data?.pages.map((page, index) => (
                        <Playlist key={index} playlists={page.items} />
                    ))}
                    <div ref={ref} />
                  </Box>
            }
        </>
    );
}

export default Library
