import { Typography } from '@mui/material';
import { styled } from '@mui/material';

export const EllipsisText = styled(Typography)({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});
