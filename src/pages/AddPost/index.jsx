import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import { useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import SimpleFileUpload from 'react-simple-file-upload';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios.js';
import { selectorIsAuth } from '../../redux/slices/auth';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectorIsAuth);
  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  // const handleChangeFile = async (event) => {
  //   try {
  //     const formData = new FormData();
  //     const file = event.target.files[0];
  //     formData.append('image', file);
  //     const { data } = await axios.post('/upload', formData);
  //     setImageUrl(data.url);
  //   } catch (error) {
  //     console.warn(error);
  //     alert('Неудачная попытка загрузить фото!');
  //   }
  // };

  const onClickRemoveImage = async () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const handleFile = (url) => {
    setImageUrl(url);
  };

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании статьи');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(', '));
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении статьи!');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'postsave',
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <div className={styles.upload}>
        <SimpleFileUpload
          apiKey="df56b32a4b5c5e53e6bb60519cf337a8"
          onSuccess={handleFile}
          width="70"
          height="70"
          preview="false"
        />
      </div>
      {imageUrl && (
        <div className={styles.cancel_btn}>
          <Button variant="contained" color="error" onClick={() => onClickRemoveImage()}>
            Удалить
          </Button>
        </div>
      )}
      {imageUrl && <img className={styles.image} src={`${imageUrl}`} alt="Uploaded" />}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={(e) => onChange(e)}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" onClick={() => onSubmit()} variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
