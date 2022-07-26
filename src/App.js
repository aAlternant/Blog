import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { fetchAuthMe, selectorIsAuth } from './redux/slices/auth';
import { Helmet } from 'react-helmet';

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const isAuth = useSelector(selectorIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chernyuk Blog</title>
        <link rel="canonical" href="http://blog-aalternant.vercel.app" />
        <meta name="description" content="Blog of junior developer" />
      </Helmet>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:tag" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
