import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    background: theme.palette.background.dark,
    color: theme.palette.foreground.dark,
  },
});

export const useStyles = makeStyles(styles);
