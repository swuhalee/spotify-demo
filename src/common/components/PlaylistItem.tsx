import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { SquareAvatar } from "../styles/avatar.styles";
import { EllipsisText } from "../styles/text.styles";

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
        <StyledPlaylistItem 
            isSelected={isSelected}
            onClick={() => handleClick(id)}
        >
            <SquareAvatar
                variant="square"
                src={imageUrl || undefined}
            >
                {!imageUrl && (
                    <Typography variant="caption" color="text.secondary" fontSize="10px">
                        NoImage
                    </Typography>
                )}
            </SquareAvatar>
            <div style={{ flex: 1, minWidth: 0 }}>
                <StyledName variant="body1">
                    {name}
                </StyledName>
                <StyledArtistName variant="subtitle1">
                    Playlist • {artistName}
                </StyledArtistName>
            </div>
        </StyledPlaylistItem>
    );
};

const StyledPlaylistItem = styled(Box)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
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
}));

const StyledName = styled(EllipsisText)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 500,
}));

const StyledArtistName = styled(EllipsisText)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

export default PlaylistItem;