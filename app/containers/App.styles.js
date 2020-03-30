import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  },
  header: {
    paddingTop: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedText: {
    fontSize: '0.9rem',
  },
});

export const useStyles = makeStyles(styles);
