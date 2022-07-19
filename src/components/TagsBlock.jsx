import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import { useDispatch } from 'react-redux';
import { fetchPostsByTag } from '../redux/slices/posts.js';
import { Link } from 'react-router-dom';

export const TagsBlock = ({ items, isLoading = true }) => {
  const dispatch = useDispatch();
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link style={{ textDecoration: 'none', color: 'black' }} to={`/tags/${name}`}>
            <ListItem
              key={i}
              onClick={() => {
                dispatch(fetchPostsByTag(name));
              }}
              disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
