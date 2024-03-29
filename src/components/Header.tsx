import React, { useState } from 'react';
import {
    IconButton,
    Typography,
    NoSsr
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import {ThemeProvider, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import StoreIcon from '@material-ui/icons/Store';
import Link from 'next/link';
import {headerStyle} from "@/ui/header";
import {AppBar, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {Kitchen} from "@material-ui/icons";

export default function Header() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const styles = headerStyle(theme)();

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(!open);
    };

    return (
        <NoSsr>
            <AppBar
                position="fixed"
                className={clsx(styles.appBar, {
                    [styles.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={handleDrawerOpen}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton >
                    <Typography variant="h6" noWrap>
                        ent_host_frontend
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={clsx(styles.drawer, {
                    [styles.drawerOpen]: open,
                    [styles.drawerClose]: !open,
                })}
                classes={{
                paper: clsx({
                    [styles.drawerOpen]: open,
                    [styles.drawerClose]: !open,
                })}}
                variant="temporary"
                anchor="left"
                open={open}
            >
                <div className={styles.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider/>
                <ThemeProvider theme={theme}>
                     <List>
                         <Link href="/products" passHref>
                             <ListItem disablePadding component="div">
                                 <ListItemIcon>
                                     <StoreIcon fontSize="large"/>
                                 </ListItemIcon>
                                 <ListItemText primary={<Typography variant="h6">Products</Typography>} />
                             </ListItem>
                         </Link>
                         <Divider/>
                         <Link href="/recipes" passHref>
                             <ListItem disablePadding component="div">
                                 <ListItemIcon>
                                     <Kitchen fontSize="large"/>
                                 </ListItemIcon>
                                 <ListItemText primary={<Typography variant="h6">Recipes</Typography>}/>
                             </ListItem>
                         </Link>
                         <Divider/>
                     </List>
                </ThemeProvider>
            </Drawer>
        </NoSsr>
    );
}
