import { Box, Skeleton } from '@mui/material';

const CardSkeleton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '160px',
                width: '100%',
                height: '100%',
                padding: '12px',
                borderRadius: '8px',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '165px',
                    aspectRatio: '1',
                    marginBottom: '8px',
                }}
            >
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{
                        borderRadius: '8px',
                    }}
                />
            </Box>
            <Skeleton
                variant="text"
                width="80%"
                height={24}
                sx={{ marginBottom: '4px' }}
            />
            <Skeleton
                variant="text"
                width="60%"
                height={20}
            />
        </Box>
    );
};

export default CardSkeleton;

