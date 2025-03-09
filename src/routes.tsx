import type { RouteObject } from 'react-router';

import Layout from './components/layout';

import Posts, { loader as postLoader } from './pages/posts';
import Home from './pages/home';

export const routes: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'posts',
                element: <Posts />,
                loader: postLoader,
            },
            {
                path: 'lorem',
                lazy: () => import('./pages/lorem'),
            },
        ],
    },
];