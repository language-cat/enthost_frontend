import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const drawerWidth = 150;

export const headerStyle = makeStyles((theme:Theme)=>{
    return (
        createStyles({
            content: {
                flexGrow: 1,
                padding: theme.spacing(3),
            },
            toolbar: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: theme.spacing(0, 1),
                ...theme.mixins.toolbar,
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0,
                whiteSpace: 'nowrap',
            },
            drawerOpen: {
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
            drawerClose: {
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                overflowX: 'hidden',
                width: theme.spacing(6) + 1,
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(6) + 1,
                },
            },
            menuButton:{
                marginRight: 10,
            },
            appBar: {
                backgroundColor: '#8eb6ff',
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            },
            appBarShift: {
                backgroundColor: '#5792fb',
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }
        })
    )
})