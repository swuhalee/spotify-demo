import { Avatar, Box, Typography, Button } from '@mui/material';
import { TrackObject } from '../../../models/track';

interface SearchResultItemProps {
    track: TrackObject;
}

const SearchResultItem = ({ track }: SearchResultItemProps) => {
    const artistNames = track.artists?.map(artist => artist.name).join(', ') || 'Unknown';
    const albumImage = track.album?.images?.[0]?.url || track.album?.images?.[track.album.images.length - 1]?.url;
    const albumName = track.album?.name || 'Unknown';

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                <Avatar
                    variant="square"
                    src={albumImage || undefined}
                    sx={{
                        width: 56,
                        height: 56,
                        backgroundColor: 'background.default',
                        borderRadius: '4px',
                        flexShrink: 0,
                    }}
                >
                    {!albumImage && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '10px',
                            }}
                        >
                            No Image
                        </Typography>
                    )}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.primary',
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {track.name || 'Unknown Track'}
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
                        {artistNames}
                    </Typography>
                </Box>
            </Box>

            <Box 
                sx={{ 
                    flex: 1, 
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '200px',
                    }}
                >
                    {albumName}
                </Typography>
            </Box>

            <Box sx={{ flexShrink: 0 }}>
                <Button
                    variant="text"
                    color="primary"
                    onClick={handleAdd}
                    sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        padding: '6px 16px',
                        fontSize: '14px',
                        minWidth: 'auto',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    Add
                </Button>
            </Box>
        </Box>
    )
}

export default SearchResultItem