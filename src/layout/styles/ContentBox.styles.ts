import { Box, styled } from '@mui/material';

export const ContentBox = styled(Box)(({ theme }) => ({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "100%",
    padding: "20px",
    marginBottom: "8px",
    marginRight: "8px",
}));

