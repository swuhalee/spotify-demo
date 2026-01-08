import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material';
import { TrackObject } from '../../../models/track';
import { SquareAvatar } from '../../../common/styles/avatar.styles';
import { EllipsisText } from '../../../common/styles/text.styles';
import useAddItemsToPlaylist from '../../../hooks/useAddItemsToPlaylist';
import { useParams } from 'react-router';

interface SearchResultItemProps {
    track: TrackObject;
}

const SearchResultItem = ({ track }: SearchResultItemProps) => {
    const { id: playlistId } = useParams<{ id: string }>();
    const { mutate: addItemsToPlaylist } = useAddItemsToPlaylist();

    const artistNames = track.artists?.map(artist => artist.name).join(', ') || 'Unknown';
    const albumImage = track.album?.images?.[0]?.url || track.album?.images?.[track.album.images.length - 1]?.url;
    const albumName = track.album?.name || 'Unknown';

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItemsToPlaylist({ playlistId: playlistId!, params: { uris: [track.uri] } });
    };

    return (
        <StyledSearchResultItem>
            <StyledLeftSection>
                <SquareAvatar
                    variant="square"
                    src={albumImage || undefined}
                >
                    {!albumImage && (
                        <Typography variant="caption" color="text.secondary" fontSize="10px">
                            No Image
                        </Typography>
                    )}
                </SquareAvatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <StyledTrackName variant="body1">
                        {track.name || 'Unknown Track'}
                    </StyledTrackName>
                    <StyledArtistName variant="subtitle1">
                        {artistNames}
                    </StyledArtistName>
                </div>
            </StyledLeftSection>

            <StyledAlbumNameContainer>
                <StyledAlbumName variant="subtitle1">
                    {albumName}
                </StyledAlbumName>
            </StyledAlbumNameContainer>

            <div style={{ flexShrink: 0 }}>
                <StyledAddButton
                    variant="text"
                    color="primary"
                    onClick={handleAdd}
                >
                    Add
                </StyledAddButton>
            </div>
        </StyledSearchResultItem>
    )
}

const StyledSearchResultItem = styled(Box)(({ theme }) => ({
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

const StyledAlbumNameContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'none',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledAddButton = styled(Button)({
    borderRadius: '20px',
    textTransform: 'none',
    padding: '6px 16px',
    fontSize: '14px',
    minWidth: 'auto',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const StyledTrackName = styled(EllipsisText)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
}));

const StyledArtistName = styled(EllipsisText)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const StyledAlbumName = styled(EllipsisText)(({ theme }) => ({
    color: theme.palette.text.secondary,
    maxWidth: '200px',
}));

export default SearchResultItem