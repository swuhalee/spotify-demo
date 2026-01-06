import { Box, Typography, styled } from '@mui/material';
import { useMemo } from 'react';

interface CategoryCardProps {
    title: string;
    imageUrl?: string;
}

const CategoryCard = ({ title, imageUrl }: CategoryCardProps) => {
    const backgroundColor = useMemo(() => {
        const colors = [
            '#E13300', '#1E3264', '#E8115B', '#148A08', '#E1118C',
            '#8D67AB', '#BA5D07', '#E91429', '#0D73EC', '#D84000',
            '#8B1A32', '#7358FF', '#B02897', '#1E3264', '#E1118C',
            '#27856A', '#477D95', '#8D67AB', '#E61E32', '#148A08'
        ];
        // title의 문자열을 숫자로 변환하여 일관된 색상 선택
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }, [title]);

    return (
        <StyledCard backgroundColor={backgroundColor}>
            <StyledTitle variant="h2" fontWeight={700}>
                {title}
            </StyledTitle>
            {imageUrl && (
                <StyledImageContainer>
                    <StyledImage src={imageUrl} alt={title} />
                </StyledImageContainer>
            )}
        </StyledCard>
    );
};

const StyledCard = styled(Box)<{ backgroundColor: string }>(({ backgroundColor }) => ({
    position: 'relative',
    width: '100%',
    aspectRatio: '1.5 / 1',
    borderRadius: '8px',
    backgroundColor: backgroundColor,
    padding: '16px',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}));

const StyledTitle = styled(Typography)({
    position: 'relative',
    zIndex: 1,
    color: '#fff',
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.2,
    wordWrap: 'break-word',
});

const StyledImageContainer = styled(Box)({
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '50%',
    transform: 'rotate(25deg) translate(18%, 2%)',
    zIndex: 0,

});

const StyledImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
});

export default CategoryCard;