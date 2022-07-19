import React from 'react';

import styles from './AddComment.module.scss';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import axios from '../../axios.js';

export const Index = ({ avatar, setLoading, setData }) => {
  const { id } = useParams();
  const [value, setValue] = React.useState('');

  const onSubmit = async () => {
    // setLoading(true);
    try {
      axios
        .post(`/posts/${id}`, {
          comment: value,
        })
        .then(({ data }) => {
          setData(data);
          setValue('');
        });
    } catch (error) {
      console.warn(error);
      alert('Не удалось отправить комментарий');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatar} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <Button variant="contained" onClick={() => onSubmit()}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
