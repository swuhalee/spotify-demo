import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { GetPlaylistResponse } from '../../../models/playlist';

interface PlaylistHeaderProps {
  playlist: GetPlaylistResponse | undefined;
}

const PlaylistHeader = ({ playlist }: PlaylistHeaderProps) => {
  return (
    <StyledGrid container spacing={{ xs: 2, md: 1 }}>
      <StyledImageGrid size={{ xs: 12, md: 2 }}>
        {playlist?.images ? (
          <StyledPlaylistImage
            src={playlist?.images[0].url}
            alt="playlist_cover.jpg"
          />
        ) : (
          <StyledPlaceholderBox>
            <MusicNoteIcon fontSize="large" />
          </StyledPlaceholderBox>
        )}
      </StyledImageGrid>
      <StyledInfoGrid size={{ xs: 12, md: 10 }}>
        <Box>
          <StyledTitle variant="h1" color="white">
            {playlist?.name}
          </StyledTitle>

          <StyledSubtitleContainer>
            <img
              src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              width="20px"
            />
            <StyledSubtitle variant="subtitle1" color="white" ml={1} fontWeight={700}>
              {playlist?.owner?.display_name ? playlist?.owner.display_name : "unknown"} • {playlist?.tracks?.total} songs
            </StyledSubtitle>
          </StyledSubtitleContainer>
        </Box>
      </StyledInfoGrid>
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  borderRadius: "16px",
  padding: "28px",
  flexShrink: 0,
});

const StyledImageGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down('md')]: {
    justifyContent: "center",
    width: "100%",
  },
  [theme.breakpoints.up('md')]: {
    display: "block",
    width: "auto",
    justifyContent: "flex-start",
  },
}));

const StyledPlaylistImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  width: "232px",
  height: "232px",
  objectFit: "cover",
  [theme.breakpoints.down('md')]: {
    width: "200px",
    height: "200px",
  },
}));

const StyledPlaceholderBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#282828",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  width: "232px",
  height: "232px",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  [theme.breakpoints.down('md')]: {
    width: "200px",
    height: "200px",
  },
}));

const StyledInfoGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up('md')]: {
    display: "block",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
}));

const StyledSubtitleContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "4px",
});

const StyledSubtitle = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export default PlaylistHeader;

