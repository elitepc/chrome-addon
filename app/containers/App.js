import React, { Fragment, useState, useCallback } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CropDinIcon from '@material-ui/icons/CropDin';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DescriptionIcon from '@material-ui/icons/Description';

import { CompanyInfo } from '../components/CompanyInfo';

import { teamlyzerUrl, blogUrl } from '../../config';

import { useStyles } from './App.styles';

export const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const onLinkClick = useCallback(url => {
    chrome.tabs.create({
      url,
    });
  });

  return (
    <Fragment>
      <CompanyInfo />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Ações
          </ListSubheader>
        }
      >
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Criar nova review" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => onLinkClick(`${teamlyzerUrl}/users/job-review/step1`)}
            >
              <ListItemIcon>
                <CropDinIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Criar review de emprego" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => onLinkClick(`${teamlyzerUrl}/users/interview-review/step1`)}
            >
              <ListItemIcon>
                <CropDinIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Criar review de entrevista" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          button
          onClick={() => onLinkClick(`${teamlyzerUrl}/companies/new-company`)}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Criar nova empresa" />
        </ListItem>
        <ListItem
          button
          onClick={() => onLinkClick(blogUrl)}
          >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
        <ListItem
          button
          onClick={() => onLinkClick(`mailto:suporte@teamlyzer.com`)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Contribuir" />
        </ListItem>
      </List>
    </Fragment>
  );
}

export default App;
