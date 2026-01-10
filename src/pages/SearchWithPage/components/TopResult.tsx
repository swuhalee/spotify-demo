import { Box, Typography, Avatar, styled } from '@mui/material';
import { TrackObject } from '../../../models/track';
import { EllipsisText } from '../../../common/styles/text.styles';
import PlayButton from '../../../common/components/PlayButton';

interface TopResultProps {
  track: TrackObject;
}

const TopResult = ({ track }: TopResultProps) => {
  const imageUrl = track.album?.images?.[0]?.url || '';
  const artistNames = track.artists?.map(a => a.name).join(', ');

  return (
    <StyledContainer>
      <Typography variant="h1" fontWeight={700} sx={{ marginBottom: "16px" }}>
        Top result
      </Typography>
      <StyledCard>
        <StyledImageContainer>
          <StyledImage
            src={imageUrl}
            alt={track.name || 'Unknown'}
          />
          <StyledPlayButtonContainer className="play-button">
            <PlayButton />
          </StyledPlayButtonContainer>
        </StyledImageContainer>
        <StyledTrackName variant="h6">
          {track.name || 'Unknown'}
        </StyledTrackName>
        <Typography 
          variant="body1" 
          sx={{ 
            width: '100%', 
            maxWidth: { xs: '180px', sm: '220px' },
            textAlign: 'center',
            color: 'text.secondary'
          }}
        >
          Song • {artistNames}
        </Typography>
      </StyledCard>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '220px',
  padding: '8px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '180px',
  },
  '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      '& .play-button': {
          opacity: 1,
          transform: 'translateY(0)',
      },
  },
}));

const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '220px',
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '180px',
  },
}));

const StyledImage = styled("img")({
  width: '100%',
  aspectRatio: '1',
  objectFit: 'cover',
  borderRadius: '8px',
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
});

const StyledPlayButtonContainer = styled(Box)({
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  opacity: 0,
  transform: 'translateY(8px)',
  transition: 'opacity 0.2s ease, transform 0.2s ease',
});

const StyledTrackName = styled(EllipsisText)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  marginTop: '8px',
  width: '100%',
  maxWidth: '220px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '180px',
  },
}));

export default TopResult;