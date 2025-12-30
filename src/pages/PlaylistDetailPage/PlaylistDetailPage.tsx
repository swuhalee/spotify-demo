import { Box, Grid, Typography } from '@mui/material';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Navigate, useParams } from 'react-router';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;
  const { data: playlist } = useGetPlaylist({ playlist_id: id, });

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 1 }}
        sx={{
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
          borderRadius: "16px",
          padding: "28px",
        }}
      >
        <Grid
          size={{ xs: 12, md: 2 }}
          sx={{
            display: { xs: "flex", sm: "block" },
            justifyContent: { xs: "center", sm: "flex-start" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {playlist?.images ? (
            <Box
              component="img"
              src={playlist?.images[0].url}
              alt="playlist_cover.jpg"
              sx={{
                borderRadius: "8px",
                height: "auto",
                width: "100%",
                maxWidth: { xs: "200px", md: "none" },
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
                minWidth: "128px",
                height: "20vh",
                width: "20vh",
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
    </div>
  )
}

export default PlaylistDetailPage
