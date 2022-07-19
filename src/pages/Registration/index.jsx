import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectorIsAuth, fetchRegistration } from '../../redux/slices/auth.js';
import { Navigate } from 'react-router-dom';

import axios from '../../axios.js';

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectorIsAuth);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = React.useState(undefined);
  const inputFileRef = React.useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    values.avatarUrl = `http://localhost:4444${imageUrl}` ?? '';
    console.log(values);
    const data = await dispatch(fetchRegistration(values));
    if (!data.payload) {
      return alert('Регистрация не удалась!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Регистрация не удалась!');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const handleChangeAvatar = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Неудачная попытка загрузить фото!');
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar
          src={`http://localhost:4444${imageUrl}`}
          alt={``}
          onClick={() => inputFileRef.current.click()}
          sx={{ width: 100, height: 100 }}
        />
      </div>
      <input type="file" ref={inputFileRef} onChange={handleChangeAvatar} hidden />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите имя' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button size="large" disabled={!isValid} type="submit" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
