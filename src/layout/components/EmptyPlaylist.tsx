import { Button, Typography } from '@mui/material'
import { ContentBox } from '../styles/ContentBox.styles';

const EmptyPlaylist = () => {
    return (
        <ContentBox sx={{
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        }}>
            <Typography variant="h2" fontWeight={700}>Create your first playlist</Typography>
            <Typography variant="body2" fontWeight={400}>It's easy, we'll help you</Typography>

            <Button variant="contained" color="secondary" size="medium" sx={{
                fontSize: '14px',
                fontWeight: 700,
                marginTop: '20px',
            }}>Create Playlist</Button>
        </ContentBox>
    )
}

export default EmptyPlaylist
