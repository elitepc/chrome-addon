import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

export const useStyles = makeStyles(styles);
