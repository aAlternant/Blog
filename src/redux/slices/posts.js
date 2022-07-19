import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchSortedPosts = createAsyncThunk('posts/fetchSortedPosts', async () => {
  const { data } = await axios.get('/posts-sorted');
  return data;
});

export const fetchPostsByTag = createAsyncThunk('posts/fetchPostsByTag', async (tag) => {
  const { data } = await axios.get(`/tags/${tag}`);
  return data;
});

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchDeletePost = createAsyncThunk('posts/deletePost', async (id) => {
  axios.delete(`/posts/${id}`);
});

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const { data } = await axios.get('/comments');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'laoding',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // Запрос постов
    [fetchPosts.pending]: (state, actions) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, actions) => {
      state.posts.items = actions.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state, actions) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // Сортировка постов
    [fetchSortedPosts.pending]: (state, actions) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchSortedPosts.fulfilled]: (state, actions) => {
      state.posts.items = actions.payload;
      state.posts.status = 'loaded';
    },
    [fetchSortedPosts.rejected]: (state, actions) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // Сортировка по тегам
    [fetchPostsByTag.pending]: (state, actions) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsByTag.fulfilled]: (state, actions) => {
      state.posts.items = actions.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsByTag.rejected]: (state, actions) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // Запрос тегов
    [fetchTags.pending]: (state, actions) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, actions) => {
      state.tags.items = actions.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state, actions) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    // Удаление поста
    [fetchDeletePost.pending]: (state, actions) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== actions.meta.arg);
    },
    // Запрос комментариев
    [fetchComments.pending]: (state, actions) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, actions) => {
      state.comments.items = actions.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state, actions) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
  },
});

export const postReducer = postsSlice.reducer;
