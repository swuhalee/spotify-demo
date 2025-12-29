import { Box, Skeleton } from '@mui/material';

const PlaylistSkeleton = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
            {[...Array(10)].map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px',
                        borderRadius: '4px',
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        width={48}
                        height={48}
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
            ))}
        </Box>
    );
};

export default PlaylistSkeleton;