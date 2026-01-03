import { Box, Skeleton } from '@mui/material';

const SearchResultItemSkeleton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                borderRadius: '8px',
            }}
        >
            <Skeleton
                variant="rectangular"
                width={56}
                height={56}
                sx={{
                    borderRadius: '4px',
                }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton
                    variant="text"
                    width="60%"
                    height={20}
                    sx={{
                        marginBottom: '4px',
                    }}
                />
                <Skeleton
                    variant="text"
                    width="40%"
                    height={16}
                />
            </Box>
        </Box>
    );
};

export default SearchResultItemSkeleton;

