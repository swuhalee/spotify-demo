import { Box, Typography, Avatar } from '@mui/material';
import { SimplifiedPlaylistObject } from '../../models/playlist';

interface PlaylistProps {
    playlists: SimplifiedPlaylistObject[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
    return (
        <>
            {playlists.map((playlist) => {
                const imageUrl = playlist.images && playlist.images.length > 0 ? playlist.images[0].url : null;
                const ownerName = playlist.owner.display_name || 'Unknown';

                return (
                    <Box
                        key={playlist.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        <Avatar
                            variant="square"
                            src={imageUrl || undefined}
                            sx={{
                                width: 48,
                                height: 48,
                                backgroundColor: 'background.paper',
                                borderRadius: '4px',
                            }}
                        >
                            {!imageUrl && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '10px',
                                    }}
                                >
                                    NoImage
                                </Typography>
                            )}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {playlist.name}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: 'text.secondary',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Playlist • {ownerName}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </>
    );
};

export default Playlist;