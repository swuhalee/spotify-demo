import { Outlet } from 'react-router'
import LibraryHead from './components/LibraryHead';
import Library from './components/Library';
import { ContentBox } from './styles/ContentBox.styles';
import NavList from './components/NavList';
import { Box, styled } from '@mui/material';
import Navbar from './components/Navbar';

const AppLayout = () => {
    return (
        <StyledLayout>
            <StyledSidebar>
                <ContentBox>
                    <NavList />
                </ContentBox>
                <ContentBox sx={{ display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
                    <LibraryHead />
                    <Library />
                </ContentBox>
            </StyledSidebar>
            <ContentBox sx={{ marginLeft: '8px', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                    <Outlet />
                </Box>
            </ContentBox>
        </StyledLayout>
    )
}

export const StyledLayout = styled("div")({
    display: "flex",
    height: "100vh",
    padding: "8px",
});

export const StyledSidebar = styled("div")(({ theme }) => ({
    minWidth: "240px",
    maxWidth: "331px",
    width: "clamp(240px, 20vw, 331px)", // clamp(최소값, 적당한값, 최대값)
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));

export default AppLayout
