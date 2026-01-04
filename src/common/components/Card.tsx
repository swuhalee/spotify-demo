import { Box } from '@mui/material';
import { styled } from '@mui/material';
import PlayButton from './PlayButton';
import { EllipsisText } from '../styles/text.styles';

interface CardProps {
    name: string;
    image: string;
    artistName: string[] | undefined;
}

const Card = ({ name, image, artistName }: CardProps) => {
    return (
        <StyledCard>
            <StyledImageContainer>
                <StyledImage
                    src={image}
                    alt={name}
                />
                <StyledPlayButtonContainer className="play-button">
                    <PlayButton />
                </StyledPlayButtonContainer>
            </StyledImageContainer>
            <StyledTitle variant="h2" paddingTop="8px" noWrap>
                {name}
            </StyledTitle>
            <StyledArtistName variant="body1" color="textSecondary" noWrap>
                {artistName?.join(', ')}
            </StyledArtistName>
        </StyledCard>
    )
}

const StyledCard = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '160px',
    width: '100%',
    height: '100%',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        '& .play-button': {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },
});

const StyledImageContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    maxWidth: '165px',
    marginBottom: '8px',
});

const StyledImage = styled("img")({
    width: '100%',
    aspectRatio: '1',
    objectFit: 'cover',
    borderRadius: '8px',
    display: 'block',
});

const StyledPlayButtonContainer = styled(Box)({
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    opacity: 0,
    transform: 'translateY(8px)',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
});

const StyledTitle = styled(EllipsisText)({
    width: '100%',
    maxWidth: '165px',
});

const StyledArtistName = styled(EllipsisText)({
    width: '100%',
    maxWidth: '165px',
});

export default Card
