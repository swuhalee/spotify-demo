import { Outlet } from 'react-router'
import LibraryHead from './components/LibraryHead';
import Library from './components/Library';
import { ContentBox } from './styles/ContentBox.styles';
import NavList from './components/NavList';
import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './components/Navbar';
import BottomNavigation from './components/BottomNavigation';

const AppLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
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
                {isMobile ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
                        <Navbar />
                        <Box sx={{ height: "20px" }} />
                        <Outlet />
                    </Box>
                ) : (
                    <ContentBox sx={{ marginLeft: '8px', display: 'flex', flexDirection: 'column' }}>
                        <Navbar />
                        <Box sx={{ height: "20px" }} />
                        <Outlet />
                    </ContentBox>
                )}
            </StyledLayout>
            <BottomNavigation />
        </>
    )
}

export const StyledLayout = styled("div")(({ theme }) => ({
    display: "flex",
    height: "100vh",
    padding: "8px",
    [theme.breakpoints.down("sm")]: {
        paddingBottom: "80px",
    },
}));

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
