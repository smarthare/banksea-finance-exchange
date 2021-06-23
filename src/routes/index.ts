import HomePage from '../pages/Home'
import CollectiblesPage from '../pages/Collectibles'
import { ReactComponent as HomeIcon } from '../assets/images/menu-icons/home.svg'
import { ReactComponent as CollectiblesIcon } from '../assets/images/menu-icons/collectibles.svg'
import { ReactComponent as ArtistsIcon } from '../assets/images/menu-icons/artists.svg'
import { ReactComponent as FarmsIcon } from '../assets/images/menu-icons/farms.svg'
import { ReactComponent as OracleIcon } from '../assets/images/menu-icons/oracle.svg'
import { ReactComponent as AiGeneratorsIcon } from '../assets/images/menu-icons/aiGenerators.svg'
import CollectibleDetailPage from '../pages/Collectibles/CollectibleDetail'
import NFTCreatePage from '../pages/Home/NFTCreate'
import PersonalHomepage from '../pages/PersonalHomepage/index'
import PleaseWaiting from '../pages/Home/PleaseWaiting'
import NFTCreatedSuccess from '../pages/Home/NFTCreatedSuccess'
import AIGenerators from '../pages/AIGenerators'

export type Route = {
  path: string
  title: string
  icon?: any
  component: any
  hidden?: boolean
  match?: RegExp
}

const routes: Route[] = [
  {
    path: '/',
    title: 'Home',
    match: /(^\/nft\/create)|(\/personal)/,
    icon: HomeIcon,
    component: HomePage
  },
  {
    path: '/ai-generators',
    title: 'AI Generators',
    icon: AiGeneratorsIcon,
    component: AIGenerators,
  },
  {
    path: '/nft/create',
    title: 'Create NFT',
    component: NFTCreatePage,
    hidden: true
  },
  {
    path: '/nft/create/success',
    title: 'NFT Created successfully',
    component: NFTCreatedSuccess,
    hidden: true
  },
  {
    path: '/collectibles',
    title: 'Collectibles',
    match: /^\/collectible\//,
    icon: CollectiblesIcon,
    component: CollectiblesPage
  },
  {
    path: '/collectible/:id',
    title: 'Collectible',
    icon: CollectiblesIcon,
    component: CollectibleDetailPage,
    hidden: true
  },
  {
    path: '/artists',
    title: 'Artists',
    icon: ArtistsIcon,
    component: PleaseWaiting
  },
  {
    path: '/farms',
    title: 'Farms',
    icon: FarmsIcon,
    component: PleaseWaiting
  },
  {
    path: '/oracle',
    title: 'Oracle',
    icon: OracleIcon,
    component: PleaseWaiting
  },
  {
    path: '/personal/home',
    title: 'Personal Homepage',
    icon: FarmsIcon,
    component: PersonalHomepage,
    hidden: true
  },
  {
    path: '/pleaseWaiting',
    title: 'PleaseWaiting',
    icon: FarmsIcon,
    component: PleaseWaiting,
    hidden: true
  }
]

export default routes
