import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import Home from '@/screens/home';

import '@/index.css';
import About from './screens/About';
import Contact from './screens/Contact';

  const paths = [
    {
        path: '/',
        element: (
          <Home/>
        ),
    },
    {
        path: '/about',
        element: (
          <About/>
        ),
    },
    {
        path: '/contact',
        element: (
          <Contact/>
        ),
    },
];

const BrowserRouter = createBrowserRouter(paths);

const App = () => {
    return (
    <MantineProvider>
      <RouterProvider router={BrowserRouter}/>
    </MantineProvider>
    )
};

export default App;
