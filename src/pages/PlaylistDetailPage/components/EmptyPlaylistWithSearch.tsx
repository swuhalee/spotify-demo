import { Box, TextField, Typography, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultItem from './SearchResultItem';
import SearchResultItemSkeleton from './SearchResultItemSkeleton';

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword] = useState<string>('');
    const { ref, inView } = useInView();
    const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track]
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event?.target.value);
    };

    const allTracks = data?.pages.flatMap((page) => page.tracks?.items || []) || [];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                paddingTop: '12px',
            }}
        >
            <Typography
                variant="h1"
                sx={{ paddingBottom: '12px' }}
            >
                Let's find something for your playlist
            </Typography>
            <TextField
                value={keyword}
                onChange={handleSearchKeyword}
                placeholder="Search for songs or episodes"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                    },
                }}
                
            />
            {isLoading && keyword && (
                <Box
                    sx={{ padding: '12px' }}
                >
                    {[...Array(4)].map((_, index) => (
                        <SearchResultItemSkeleton key={index} />
                    ))}
                </Box>
            )}
            {allTracks.length > 0 && (
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '12px',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {allTracks.map((track, index) => (
                        <SearchResultItem
                            key={track.id || index}
                            track={track}
                        />
                    ))}
                    <Box ref={ref} sx={{ height: '4px' }} />
                    {isFetchingNextPage && (
                        <Box sx={{ padding: '16px', textAlign: 'center' }}>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Loading more...
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
            {keyword && allTracks.length === 0 && !isLoading && (
                <Box sx={{ padding: '24px', textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        No results for "{keyword}"
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default EmptyPlaylistWithSearch
