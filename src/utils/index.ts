import { useLocation } from 'react-router-dom'

export const useLocationQuery = (key: string): string | undefined => {
  return new URLSearchParams(useLocation().search).get(key) ?? undefined
}

export const thumbnailAddress = (address?: string) => {
  return  address ? `${address.substring(0, 6)}...${address.slice(-4)}`: '-'
}
