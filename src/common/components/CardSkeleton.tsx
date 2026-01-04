import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material';

const CardSkeleton = () => {
    return (
        <StyledCardSkeleton>
            <StyledImageContainer>
                <StyledImageSkeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                />
            </StyledImageContainer>
            <StyledTextSkeleton
                variant="text"
                width="80%"
                height={24}
            />
            <StyledTextSkeleton
                variant="text"
                width="60%"
                height={20}
            />
        </StyledCardSkeleton>
    );
};

const StyledCardSkeleton = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '160px',
    width: '100%',
    height: '100%',
    padding: '12px',
    borderRadius: '8px',
});

const StyledImageContainer = styled(Box)({
    width: '100%',
    maxWidth: '165px',
    aspectRatio: '1',
    marginBottom: '8px',
});

const StyledImageSkeleton = styled(Skeleton)({
    borderRadius: '8px',
});

const StyledTextSkeleton = styled(Skeleton)({
    marginBottom: '4px',
    '&:last-of-type': {
        marginBottom: 0,
    },
});

export default CardSkeleton;

