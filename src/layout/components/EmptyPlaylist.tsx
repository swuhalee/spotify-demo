import { Button, Typography } from '@mui/material'
import { ContentBox } from '../styles/ContentBox.styles';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import { getSpotifyAuthUrl } from '../../utils/auth';

const EmptyPlaylist = () => {
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
        <ContentBox sx={{
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        }}>
            <Typography variant="h2" fontWeight={700}>Create your first playlist</Typography>
            <Typography variant="body2" fontWeight={400}>It's easy, we'll help you</Typography>

            <Button 
              variant="contained" 
              color="secondary" 
              size="medium" 
              sx={{
                fontSize: '14px',
                fontWeight: 700,
                marginTop: '20px',
              }} 
              onClick={handleCreatePlaylist}
            >
              Create Playlist
            </Button>
        </ContentBox>
    )
}

export default EmptyPlaylist
