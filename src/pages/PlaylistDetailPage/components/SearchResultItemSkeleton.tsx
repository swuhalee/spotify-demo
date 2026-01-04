import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material';

const SearchResultItemSkeleton = () => {
    return (
        <StyledSearchResultItemContainer>
            <StyledImageSkeleton
                variant="rectangular"
                width={56}
                height={56}
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
        </StyledSearchResultItemContainer>
    );
};

const StyledSearchResultItemContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    borderRadius: '8px',
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

export default SearchResultItemSkeleton;

