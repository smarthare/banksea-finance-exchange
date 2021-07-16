import HomePage from '../pages/Home'
import CollectiblesPage from '../pages/Collectibles'
import { ReactComponent as HomeIcon } from '../assets/images/menu-icons/home.svg'
import { ReactComponent as CollectiblesIcon } from '../assets/images/menu-icons/collectibles.svg'
import { ReactComponent as ArtistsIcon } from '../assets/images/menu-icons/artists.svg'
import { ReactComponent as FarmsIcon } from '../assets/images/menu-icons/farms.svg'
import { ReactComponent as OracleIcon } from '../assets/images/menu-icons/oracle.svg'
import { ReactComponent as LevelUpIcon } from '../assets/images/menu-icons/level-up.svg'
import { ReactComponent as PoolsIcon } from '../assets/images/menu-icons/pools.svg'
import { ReactComponent as MarketplaceIcon } from '../assets/images/menu-icons/marketplace.svg'
import { ReactComponent as PriceAirDropIcon } from '../assets/images/menu-icons/priceAirDrop.svg'


import { CollectibleDetailPage } from '../pages/Collectibles/CollectibleDetail'
import NFTCreatePage from '../pages/Home/NFTCreate'
import PersonalHomepage from '../pages/PersonalHome/index'
import PleaseWaiting from '../pages/Home/PleaseWaiting'
import NFTCreatedSuccess from '../pages/Home/NFTCreatedSuccess'
import AIGenerators from '../pages/AIGenerators'
import FarmPage from '../pages/Farms'
import TestPage from '../pages/Test'
import VotePage from '../pages/Vote'
import PoolsPage from '../pages/Pools/index'
import NFTMortgageDetailPage from '../pages/Pools/Detail/NFTMortgageDetail'
import MortgagePoolDetailPage from '../pages/Pools/Detail/MortgagePoolDetail'
import DepositItemDetailPage from '../pages/Pools/Detail/DepositItemDetail'

export type Route = {
  path: string
  title: string
  icon?: any
  component: any
  hidden?: boolean
  match?: RegExp
  pools?: boolean
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
    path: '/collectibles',
    title: 'Marketplace',
    match: /^\/collectible\//,
    icon: MarketplaceIcon,
    component: CollectiblesPage
  },
  {
    path: '/ai-generators',
    title: 'Level Up',
    icon: LevelUpIcon,
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
    path: '/pools',
    title: 'Pools',
    icon: PoolsIcon,
    component: PoolsPage
  },
  {
    path: '/pools/*',
    title: 'Pools',
    icon: PoolsIcon,
    component: PoolsPage
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
    component: FarmPage
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
  },
  {
    path: '/test',
    title: 'Test',
    component: TestPage,
    hidden: true
  },
  {
    path: '/Airdrop',
    title: 'Airdrop',
    icon: PriceAirDropIcon,
    component: VotePage
  },
  {
    path: '/nftMortgageDetailPage',
    title: 'nftMortgageDetailPage',
    component: NFTMortgageDetailPage,
    hidden: true
  },
  {
    path: '/mortgagePoolDetail',
    title: 'mortgagePoolDetail',
    component: MortgagePoolDetailPage,
    hidden: true
  },
  {
    path: '/deposit/depositDetail',
    title: 'DepositDetail',
    match: /^\/pools\//,
    component: DepositItemDetailPage,
    hidden: true
  }
]

export default routes
