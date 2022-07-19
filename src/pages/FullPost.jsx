import React from 'react';
import { useParams } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { useSelector } from 'react-redux';
import { selectorIsAuth } from '../redux/slices/auth';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios.js';

export const FullPost = () => {
  const isAuth = useSelector(selectorIsAuth);
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи!');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={data.comments} isLoading={isLoading}>
        {isAuth ? (
          <Index
            setLoading={setLoading}
            setData={setData}
            avatar={
              data.user.avatatUrl === ('undefined' || null || undefined)
                ? '/noavatar.png'
                : data.user.avatarUrl
            }
          />
        ) : null}
      </CommentsBlock>
    </>
  );
};
