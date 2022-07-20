import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, fetchSortedPosts, fetchComments } from '../redux/slices/posts.js';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const [tabs, setTab] = React.useState(0);

  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = comments.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tabs} aria-label="basic tabs example">
        <Tab
          onClick={() => {
            dispatch(fetchPosts());
            setTab(0);
          }}
          label="Новые"
        />
        <Tab
          onClick={() => {
            dispatch(fetchSortedPosts());
            setTab(1);
          }}
          label="Популярные"
        />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${obj.imageUrl}` : ''}
                user={{
                  avatarUrl: `${obj.user.avatarUrl}`,
                  fullName: `${obj.user.fullName}`,
                }}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.items} isLoading={isCommentsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
