import React from 'react';
import { Box, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { NavLink, useLocation } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const BottomNavigation = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { pathname } = useLocation();

    if (!isMobile) {
        return null;
    }

    const navItems = [
        { path: '/', label: 'Home', icon: HomeIcon },
        { path: '/search', label: 'Search', icon: SearchIcon },
        { path: '/playlist', label: 'Your Library', icon: LibraryMusicIcon },
    ];

    return (
        <StyledBottomNavigation>
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path || 
                    (item.path === '/search' && pathname.startsWith('/search'));

                return (
                    <StyledNavLink key={item.path} to={item.path}>
                        <IconBox isActive={isActive}>
                            <Icon sx={{ fontSize: '24px' }} />
                        </IconBox>
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                fontSize: '11px',
                                fontWeight: isActive ? 700 : 400,
                                color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
                            }}
                        >
                            {item.label}
                        </Typography>
                    </StyledNavLink>
                );
            })}
        </StyledBottomNavigation>
    );
};

const StyledBottomNavigation = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70px',
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider || '#282828'}`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '8px 0',
    zIndex: 1000,
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));

const StyledNavLink = styled(NavLink)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    textDecoration: 'none',
    flex: 1,
    padding: '4px 0',
});

const IconBox = styled(Box)<{ isActive: boolean }>(({ theme, isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
    transition: 'color 0.2s ease',
}));

export default BottomNavigation;

