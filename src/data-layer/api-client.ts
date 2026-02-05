import type { VocabEntry } from '@/models/vocabulary'
import { mockWordData, mockWordData2 } from './mock-data'

const BASE_URL = 'https://wordsapiv1.p.rapidapi.com/words/'
const KEY = import.meta.env.VITE_RAPIDAPI_KEY || ''
const HOST = 'wordsapiv1.p.rapidapi.com'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const makeHeaders = () => ({
  'X-RapidAPI-Key': KEY,
  'X-RapidAPI-Host': HOST,
})

export const grabRandomTerm = async (): Promise<VocabEntry> => {
  // Use mock data if enabled
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return Math.random() > 0.5 ? mockWordData : mockWordData2
  }
  
  const url = `${BASE_URL}?random=true`
  
  const res = await fetch(url, {
    method: 'GET',
    headers: makeHeaders(),
  })

  if (!res.ok) throw new Error(`Failed: ${res.statusText}`)

  return await res.json()
}

export const grabTermInfo = async (term: string): Promise<VocabEntry> => {
  // Mock doesn't support specific term lookup
  if (USE_MOCK) {
    return mockWordData
  }
  
  const url = `${BASE_URL}${term}`
  
  const res = await fetch(url, {
    method: 'GET',
    headers: makeHeaders(),
  })

  if (!res.ok) throw new Error(`Failed: ${res.statusText}`)

  return await res.json()
}
