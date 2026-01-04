import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material';

const PlaylistSkeleton = () => {
    return (
        <StyledPlaylistSkeleton>
            {[...Array(10)].map((_, index) => (
                <StyledSkeletonItem key={index}>
                    <StyledImageSkeleton
                        variant="rectangular"
                        width={48}
                        height={48}
                    />
                    <StyledContent>
                        <StyledTextSkeleton
                            variant="text"
                            width="60%"
                            height={20}
                        />
                        <StyledTextSkeleton
                            variant="text"
                            width="40%"
                            height={16}
                        />
                    </StyledContent>
                </StyledSkeletonItem>
            ))}
        </StyledPlaylistSkeleton>
    );
};

const StyledPlaylistSkeleton = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflowY: 'auto',
    overflowX: 'hidden',
    minHeight: 0,
});

const StyledSkeletonItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px',
    borderRadius: '4px',
});

const StyledContent = styled(Box)({
    flex: 1,
    minWidth: 0,
});

const StyledImageSkeleton = styled(Skeleton)({
    borderRadius: '4px',
});

const StyledTextSkeleton = styled(Skeleton)({
    marginBottom: '4px',
    '&:last-of-type': {
        marginBottom: 0,
    },
});

export default PlaylistSkeleton;
