import About from './views/about';
import Home from './views/home'
import Page1 from './views/page1';
import Page2 from './views/page2';
import Page3 from './views/page3';

const routers = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/page1', element: <Page1 /> },
  { path: '/page2', element: <Page2 /> },
  { path: '/page3', element: <Page3 /> },
]

export default routers;