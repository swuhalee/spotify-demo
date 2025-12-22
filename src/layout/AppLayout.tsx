import { Outlet } from 'react-router'
import LibraryHead from './components/LibraryHead/LibraryHead';
import Library from './components/Library/Library';
import { ContentBox } from './styles/ContentBox.styles';
import Navigation from './components/Navigation/Navigation';
import { styled } from '@mui/material';

export const Layout = styled("div")({
    display: "flex",
    height: "100vh",
    padding: "8px",
});

export const Sidebar = styled("div")(({ theme }) => ({
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

const AppLayout = () => {
    return (
        <Layout>
            <Sidebar>
                <ContentBox>
                    <Navigation />
                </ContentBox>
                <ContentBox sx={{ height: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <LibraryHead />
                    <Library />
                </ContentBox>
            </Sidebar>
            <Outlet />
        </Layout>
    )
}

export default AppLayout
