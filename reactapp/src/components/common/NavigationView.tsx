import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import { Link } from 'react-router-dom';



const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root:{
    display:"flex",
    height:"100vh",
    width:"100%",
  },
  navRoot: {
    display: 'flex',
    width: "100%"
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  title:{
    color: "white",
    fontStyle: "normal",
    fontWeight: 500,
    textDecoration: "none",
  },
  backdrop:{
    zIndex:5000,
  }

}));

interface IProps{
    drawer: JSX.Element
}

const NavigationView : React.FC<IProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
  //This is the layout of the drawer
  const drawer = props.drawer;

  const appBar = (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap component={Link} to="/main">
          What Should I Do?
        </Typography>
        <Box flexGrow={1} />
      </Toolbar>
    </AppBar>
  );
  
  return (
    <div className={classes.root}>
        {appBar}
        <nav className={classes.drawer}>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                className={classes.closeMenuButton}
              >
                <CloseIcon />
              </IconButton>
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.toolbar} />
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="start" style={{backgroundColor:"whitesmoke"}}>
        <div className={classes.toolbar}/>
        <Box display="flex" justifyItems="center" justifyContent="center" height="100%"  width="100%">
          {props.children}
        </Box>
      </Box>
    </div>
  );
}

export default NavigationView;