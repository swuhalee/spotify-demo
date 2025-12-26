import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';

const LibraryHead = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <BookmarkIcon />
                <Typography variant="h2" fontWeight={700}>Your Library</Typography>
            </div>
            <IconButton color="primary">
                <AddIcon />
            </IconButton>
        </div>
    )
}

export default LibraryHead
