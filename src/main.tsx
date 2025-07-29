import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../app/root';
import Index from '../app/routes/_index';
import Login from '../app/routes/login';
import Register from '../app/routes/register';
import Logout from '../app/routes/logout';
import ArticleList from '../app/routes/articleList';
import ArticleDetail from '../app/routes/article.$id';
import NewArticle from '../app/routes/articles.new';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: 'articles',
        element: <ArticleList />,
      },
      {
        path: 'article/:id',
        element: <ArticleDetail />,
      },
      {
        path: 'articles/new',
        element: <NewArticle />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);