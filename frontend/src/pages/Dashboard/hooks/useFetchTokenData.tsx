import { useCallback, useState } from 'react'
import { CoinsApiResource, type CoinsApiUrlSegment } from '../types'

const API_URL = import.meta.env.VITE_API_URL

export default function useFetchTokenData() {
  const [data, setData] = useState<{ [key: string]: string | number } | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>()

  const fetchTokenData = useCallback(
    async (path: CoinsApiUrlSegment, resource: CoinsApiResource, address?: string): Promise<void> => {
      setIsLoading(true)
      try {
        const response = await fetch(`${API_URL}/coins/${path}/${resource}/${address ?? ''}`)

        if (!response.ok) {
          throw new Error(`Something went wrong while fetching ${resource} data. Please try again later.`)
        }

        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return { data, isLoading, error, fetchTokenData }
}
