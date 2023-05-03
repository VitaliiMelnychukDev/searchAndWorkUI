import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { Container, MenuItemWrapper } from './styled';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { generalPath, globalPath } from '../../../constants/paths';
import { MenuItem } from '@mui/material';
import useAuthContext from '../../../store/Auth';

export const Header = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, logout } = useAuthContext();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout= () => {
    logout();
  };

  return (
    <Container>
      <Box sx={{ minHeight: '70px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <MenuItemWrapper to={globalPath}>
          <Typography sx={{ minWidth: 100, fontSize: '19px' }}>Home</Typography>
        </MenuItemWrapper>
        {user && <MenuItemWrapper to={generalPath.accountCategories}>
          <Typography sx={{ minWidth: 100, fontSize: '19px' }}>Categories</Typography>
        </MenuItemWrapper>}
        {user && <MenuItemWrapper to={generalPath.accountHours}>
          <Typography sx={{ minWidth: 170, fontSize: '19px' }}>Working Hours</Typography>
        </MenuItemWrapper>}
        {user && <MenuItemWrapper to={generalPath.works}>
          <Typography sx={{ minWidth: 100, fontSize: '19px' }}>Works</Typography>
        </MenuItemWrapper>}
        {user && <MenuItemWrapper to={generalPath.offers}>
          <Typography sx={{ minWidth: 100, fontSize: '19px' }}>Offers</Typography>
        </MenuItemWrapper>}
      </Box>
      <Box sx={{ minHeight: '70px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {!user && <MenuItemWrapper to={generalPath.login}>
          <Typography sx={{ minWidth: 100 }}>Log In</Typography>
        </MenuItemWrapper>}
        {!user && <MenuItemWrapper to={generalPath.register}>
          <Typography sx={{ minWidth: 100 }}>Register</Typography>
        </MenuItemWrapper>}
        {user && <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> <MenuItemWrapper to={generalPath.account}>
            <Typography sx={{ minWidth: 100 }}>Profile</Typography>
          </MenuItemWrapper>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Container>
  );
}