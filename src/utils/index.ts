import { useLocation } from 'react-router-dom'
import { PLATFORMS } from '../constants'
import { useEffect, useState } from 'react'

export const useLocationQuery = (key: string): string | undefined => {
  return new URLSearchParams(useLocation().search).get(key) ?? undefined
}

export const useCurrentPlatform = () => {
  const location = useLocation()
  const platformInLocationQuery = useLocationQuery('platform')

  const [platform, setPlatform] = useState(platformInLocationQuery ?? PLATFORMS[0].name)

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    const platform = params.get('platform')!

    setPlatform(platform ?? PLATFORMS[0].name)
  }, [location])

  return {
    platform
  }
}
