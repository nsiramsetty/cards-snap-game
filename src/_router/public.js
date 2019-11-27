import Home from '../_view/public/routes/Home/Home'
import NotFound from '../_view/public/routes/NotFound/NotFound'

const publicRoutes = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/*',
  name: 'not-found',
  component: NotFound
}];

export default publicRoutes;
