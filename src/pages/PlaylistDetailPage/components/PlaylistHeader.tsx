import { Box, Grid, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { GetPlaylistResponse } from '../../../models/playlist';

interface PlaylistHeaderProps {
  playlist: GetPlaylistResponse | undefined;
}

const PlaylistHeader = ({ playlist }: PlaylistHeaderProps) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 1 }}
      sx={{
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
        borderRadius: "16px",
        padding: "28px",
        flexShrink: 0,
      }}
    >
      <Grid
        size={{ xs: 12, md: 2 }}
        sx={{
          display: { xs: "flex", md: "block" },
          justifyContent: { xs: "center", md: "flex-start" },
          width: { xs: "100%", md: "auto" },
        }}
      >
        {playlist?.images ? (
          <Box
            component="img"
            src={playlist?.images[0].url}
            alt="playlist_cover.jpg"
            sx={{
              borderRadius: "8px",
              width: { xs: "200px", md: "232px" },
              height: { xs: "200px", md: "232px" },
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              backgroundColor: "#282828",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              width: { xs: "200px", md: "232px" },
              height: { xs: "200px", md: "232px" },
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          >
            <MusicNoteIcon fontSize="large" />
          </Box>
        )}
      </Grid>
      <Grid
        size={{ xs: 12, md: 10 }}
        sx={{
          display: { xs: "flex", md: "block" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Box>
          <Typography
            variant="h1"
            color="white"
            sx={{
              fontSize: { xs: "1.5rem", md: "3rem" },
              textAlign: { xs: "center", md: "left" },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {playlist?.name}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            sx={{
              marginTop: "4px",
            }}
          >
            <img
              src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              width="20px"
            />
            <Typography
              variant="subtitle1"
              color="white"
              ml={1}
              fontWeight={700}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {playlist?.owner?.display_name ? playlist?.owner.display_name : "unknown"} • {playlist?.tracks?.total} songs
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PlaylistHeader;

