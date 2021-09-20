import React, { useEffect, useState } from 'react';
import {
    Drawer as MuiDrawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SvgIcon,
} from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { navBarElements } from 'src/routing/navBarElements';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  });
  
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const drawerPaperMixin= (theme: Theme): CSSObject => ({
    overflowX: 'hidden',
    top: '73px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    paddingTop: theme.spacing(2)
});

const DrawerHeader = styled('div')({
    paddingLeft: 26,
    paddingBottom: 12
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),  
        '& .MuiDrawer-paper': {
            ...drawerPaperMixin(theme),
            ...openedMixin(theme),
        }
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
            ...drawerPaperMixin(theme),
            ...closedMixin(theme),
        }
      }),
}));

const NavBarLink = styled('a')({
    textDecoration: 'none',
    color: 'inherit'
});

const activeItemStyle: CSSObject = {
    backgroundColor: '#8897B9',
    '&:before': {
        content: '""',
        width: '4px',
        backgroundColor: '#F0874A',
        height: '100%',
        position: 'absolute',
        left: 0
    }
}

const NavBar = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState<string>();
    const location = useLocation();

    const handleToggleDrawer = () => setOpen(!open);

    useEffect(() => {
        if (location?.pathname) setActiveNavItem(location.pathname.split('/')[1]);
    }, [location])

    return (
        <Drawer
            variant="permanent"
            open={open}
        >
            <DrawerHeader>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleToggleDrawer}
                    edge="start"
                    sx={{marginRight: '36px'}}  
                >
                    <MenuIcon />
                </IconButton>
            </DrawerHeader>
            <List>
                {navBarElements.map((item): JSX.Element => (
                    <Link key={item.name} to={item.name} component={NavBarLink}>
                        <ListItem
                            sx={activeNavItem === item.name ? activeItemStyle : {}}>
                            <ListItemIcon sx={{pl: 1, color: 'common.white'}}>
                                <SvgIcon
                                    component={item.icon}
                                    viewBox="0 0 28 28" 
                                    width="28" 
                                    height="28"
                                />
                            </ListItemIcon>
                            <ListItemText sx={{fontSize: 14}} primary={item.label} disableTypography/>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
    );
};

export default NavBar;
