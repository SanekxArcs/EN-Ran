import { VocabEntry } from '@/models/vocabulary'

const BASE_URL = 'https://wordsapiv1.p.rapidapi.com/words/'
const KEY = import.meta.env.VITE_RAPIDAPI_KEY || ''
const HOST = 'wordsapiv1.p.rapidapi.com'

const makeHeaders = () => ({
  'X-RapidAPI-Key': KEY,
  'X-RapidAPI-Host': HOST,
})

export const grabRandomTerm = async (): Promise<VocabEntry> => {
  const url = `${BASE_URL}?random=true`
  
  const res = await fetch(url, {
    method: 'GET',
    headers: makeHeaders(),
  })

  if (!res.ok) throw new Error(`Failed: ${res.statusText}`)

  return await res.json()
}

export const grabTermInfo = async (term: string): Promise<VocabEntry> => {
  const url = `${BASE_URL}${term}`
  
  const res = await fetch(url, {
    method: 'GET',
    headers: makeHeaders(),
  })

  if (!res.ok) throw new Error(`Failed: ${res.statusText}`)

  return await res.json()
}
