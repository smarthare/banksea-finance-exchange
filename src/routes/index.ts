import HomePage from '../pages/Home'

export type Route = {
  path: string
  title: string
  icon: any
  component: any
}

const routes: Route[] = [
  {
    path: '/',
    title: 'Home',
    icon: '',
    component: HomePage
  },
  {
    path: '/collectibles',
    title: 'Collectibles',
    icon: '',
    component: HomePage
  },
  {
    path: '/artists',
    title: 'Artists',
    icon: '',
    component: HomePage
  },
  {
    path: '/farms',
    title: 'Farms',
    icon: '',
    component: HomePage
  },
  {
    path: '/oracle',
    title: 'Oracle',
    icon: '',
    component: HomePage
  }
]

export default routes
