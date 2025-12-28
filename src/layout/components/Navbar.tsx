import * as React from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, ListItemIcon, Tooltip, styled, Skeleton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useQueryClient } from '@tanstack/react-query';
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { logout } from '../../utils/auth';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    marginTop: theme.spacing(1.5),
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(1),
    },
    '& .MuiMenuItem-root': {
      '&:hover': {
        backgroundColor: '#1a1a1a',
      },
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      backgroundColor: theme.palette.background.paper,
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}));

const Navbar = () => {
  const { data: userProfile, isLoading } = useGetCurrentUserProfile();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    queryClient.clear();
    logout();
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
        <IconButton size="small" disabled>
          <Skeleton variant="circular" width={32} height={32} />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
      {userProfile
        ? (
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar
                  src={userProfile.images[0]?.url}
                  alt={userProfile.display_name || ''}
                />
              </IconButton>
            </Tooltip>
            <StyledMenu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </StyledMenu>
          </>
        )
        : <LoginButton />
      }
    </Box>
  )
}

export default Navbar
