import HomePage from '../pages/Home'
import CollectiblesPage from '../pages/Collectibles'
import ArtistPage from '../pages/Artists'
import { ReactComponent as HomeIcon } from '../assets/images/menu-icons/home.svg'
import { ReactComponent as CollectiblesIcon } from '../assets/images/menu-icons/collectibles.svg'
import { ReactComponent as ArtistsIcon } from '../assets/images/menu-icons/artists.svg'
import { ReactComponent as FarmsIcon } from '../assets/images/menu-icons/farms.svg'
import { ReactComponent as OracleIcon } from '../assets/images/menu-icons/oracle.svg'
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
    icon: HomeIcon,
    component: HomePage
  },
  {
    path: '/collectibles',
    title: 'Collectibles',
    icon: CollectiblesIcon,
    component: CollectiblesPage
  },
  {
    path: '/artists',
    title: 'Artists',
    icon: ArtistsIcon,
    component: ArtistPage
  },
  {
    path: '/farms',
    title: 'Farms',
    icon: FarmsIcon,
    component: HomePage
  },
  {
    path: '/oracle',
    title: 'Oracle',
    icon: OracleIcon,
    component: HomePage
  }
]

export default routes
