import { Avatar } from '@mui/material';
import { styled } from '@mui/material';

export const SquareAvatar = styled(Avatar)(({ theme }) => ({
    width: 50,
    height: 50,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    flexShrink: 0,
}));
