import { makeStyles } from '@material-ui/styles';

export const  DrawerStyle = makeStyles({
  drawerPaper: {
    "&&": {
      backgroundColor: "var(--background)",
      
    }},
   drawerPaperDarkMode: {
       "&&":{
    backgroundColor: "var(--backgroundDarkMode)",
    borderColor:'var(--backgroundDarkMode2)',
   }
  }
});