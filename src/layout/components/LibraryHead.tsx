import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';

const LibraryHead = () => {
    const { data: userProfile } = useGetCurrentUserProfile()
    const { mutate: createPlaylist } = useCreatePlaylist();
    const handleCreatePlaylist = () => {
        if (userProfile) {
            createPlaylist({ name: 'New Playlist' });
        } else {
            getSpotifyAuthUrl();
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <BookmarkIcon />
                <Typography variant="h2" fontWeight={700}>Your Library</Typography>
            </div>
            <IconButton color="primary" onClick={handleCreatePlaylist}>
                <AddIcon />
            </IconButton>
        </div>
    )
}

export default LibraryHead
