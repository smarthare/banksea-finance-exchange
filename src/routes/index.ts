import HomePage from '../pages/Home'
import CollectiblesPage from '../pages/Collectibles'
import ArtistPage from '../pages/Artists'

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
    component: CollectiblesPage
  },
  {
    path: '/artists',
    title: 'Artists',
    icon: '',
    component: ArtistPage
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
