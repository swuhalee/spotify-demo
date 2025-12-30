import { Avatar, Box, Typography } from "@mui/material";
import theme from "../../theme";

interface PlaylistItemProps {
    id: string;
    name: string;
    artistName: string | null;
    imageUrl: string | null;
    handleClick: (id: string) => void;
    isSelected?: boolean;
}

const PlaylistItem = ({ id, name, artistName, imageUrl, handleClick, isSelected = false }: PlaylistItemProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: isSelected ? theme.palette.action.active : "",
                '&:hover': {
                    backgroundColor: isSelected
                        ? theme.palette.action.active
                        : 'action.hover',
                },
            }}
            onClick={() => handleClick(id)}
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
                    {name}
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
                    Playlist • {artistName}
                </Typography>
            </Box>
        </Box>
    );
};

export default PlaylistItem;