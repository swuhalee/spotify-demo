import { useState } from 'react';
import { Box, Typography, styled, IconButton, Menu, MenuItem, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TrackObject } from '../../../models/track';
import { SquareAvatar } from '../../../common/styles/avatar.styles';
import { EllipsisText } from '../../../common/styles/text.styles';
import useGetCurrentUserPlaylists from '../../../hooks/useGetCurrentUserPlaylists';
import useAddItemsToPlaylist from '../../../hooks/useAddItemsToPlaylist';
import useGetCurrentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import { SimplifiedPlaylistObject } from '../../../models/playlist';

interface SongsProps {
  tracks: TrackObject[];
  onTrackClick?: (track: TrackObject) => void;
}

const Songs = ({ tracks, onTrackClick }: SongsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackObject | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { data: userProfile } = useGetCurrentUserProfile();
  const { data: playlistsData } = useGetCurrentUserPlaylists({ limit: 50, offset: 0 });
  const playlists = playlistsData?.pages.flatMap(page => page.items) || [];

  const { mutate: addItemsToPlaylist } = useAddItemsToPlaylist();

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAddButtonClick = (event: React.MouseEvent<HTMLElement>, track: TrackObject) => {
    event.stopPropagation();
    setSelectedTrack(track);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTrack(null);
  };

  const handlePlaylistSelect = (playlist: SimplifiedPlaylistObject) => {
    if (selectedTrack) {
      addItemsToPlaylist({
        playlistId: playlist.id,
        params: { uris: [selectedTrack.uri] }
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <StyledContainer>
      <Typography variant="h1" fontWeight={700} sx={{ marginBottom: '16px' }}>
        Songs
      </Typography>
      <StyledList>
        {tracks.slice(0, 4).map((track, index) => {
          const imageUrl = track.album?.images?.[0]?.url || track.album?.images?.[track.album.images.length - 1]?.url;
          const artistNames = track.artists?.map(artist => artist.name).join(', ') || 'Unknown';

          return (
            <StyledListItem
              key={track.id || index}
              onClick={() => onTrackClick?.(track)}
            >
              <StyledLeftSection>
                <SquareAvatar variant="square" src={imageUrl || undefined}>
                  {!imageUrl && (
                    <Typography variant="caption" color="text.secondary" fontSize="10px">
                      No Image
                    </Typography>
                  )}
                </SquareAvatar>
                <StyledTrackInfo>
                  <StyledTrackName variant="h2">
                    {track.name || 'Unknown'}
                  </StyledTrackName>
                  <StyledArtistName variant="body1">
                    {artistNames}
                  </StyledArtistName>
                </StyledTrackInfo>
              </StyledLeftSection>
              <StyledRightSection>
                <StyledDuration variant="body1">
                  {formatDuration(track.duration_ms || 0)}
                </StyledDuration>
                {userProfile && (
                  <IconButton
                    size="small"
                    onClick={(e) => handleAddButtonClick(e, track)}
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': { color: 'text.primary' }
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                )}
              </StyledRightSection>
            </StyledListItem>
          );
        })}
      </StyledList>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            maxHeight: 300,
            width: 250,
            backgroundColor: 'background.paper',
          }
        }}
      >
        {playlists.map((playlist) => (
          <MenuItem
            key={playlist.id}
            onClick={() => handlePlaylistSelect(playlist)}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <EllipsisText variant="body2">
              {playlist.name}
            </EllipsisText>
          </MenuItem>
        ))}
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Added to Playlist"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const StyledListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledLeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
  minWidth: 0,
});

const StyledTrackInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  flex: 1,
});

const StyledTrackName = styled(EllipsisText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const StyledArtistName = styled(EllipsisText)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const StyledRightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const StyledDuration = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export default Songs;

