import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import { styled } from '@mui/material';
import { NavLink } from 'react-router';

const NavList = () => {
    return (
        <StyledNavList>
            <StyledNavLink to="/">
                <HomeIcon />
                <Typography variant="h2" fontWeight={700}>Home</Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
                <SearchIcon />
                <Typography variant="h2" fontWeight={700}>Search</Typography>
            </StyledNavLink>
        </StyledNavList>
    )
}

export const StyledNavList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
});

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
    gap: "20px",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
    "&:hover": {
        color: theme.palette.text.primary,
    },
    "&.active": {
        color: theme.palette.text.primary,
    },
}));

export default NavList