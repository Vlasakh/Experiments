const drawerWidth = 240;

const stylesDynamic = theme => ({
    'appBar': {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'appBarShift': {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    // vtodo: не передалывается на postCss слетает панель, переделать !
    'drawerPaper': {
        position: 'relative',
        width: drawerWidth,
    },
    'drawerHeader': {
        ...theme.mixins.toolbar,
    },
    // vtodo: переделать оставшиеся стили
    'content': {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        // padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    'contentShift': {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});

export default stylesDynamic;
