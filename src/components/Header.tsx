import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    NoSsr,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import {ThemeProvider, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import StoreIcon from '@material-ui/icons/Store';
import Link from 'next/link';
import {headerStyle} from "@/ui/header";


export default function Header() {
    const [open, setOpen] = useState(false);
    const styles = headerStyle();
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
                variant="permanent"
                className={clsx(styles.drawer, {
                    [styles.drawerOpen]: open,
                    [styles.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [styles.drawerOpen]: open,
                        [styles.drawerClose]: !open,
                    }),
                }}
            >
                <div className={styles.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <ThemeProvider theme={theme}>
                 <List>
                     <Link href="/products" passHref>
                         <ListItem button component="div">
                             <ListItemIcon>
                                 <StoreIcon />
                             </ListItemIcon>
                             <ListItemText primary="产品" />
                         </ListItem>
                     </Link>
                     <Link href="/recipes" passHref>
                        <ListItem button component="div">
                             <ListItemIcon>
                                <StoreIcon />
                             </ListItemIcon>
                             <ListItemText primary="食谱" />
                         </ListItem>
                     </Link>
                 </List>
                </ThemeProvider>
            </Drawer>
        </NoSsr>
    );
}
