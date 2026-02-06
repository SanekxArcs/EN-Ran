import type { LearnedVocab, VocabTrackerState } from '@/models/vocabulary'

const KEY = 'vocab_tracker_enran'

export const pullData = (): VocabTrackerState => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const data = JSON.parse(raw)
      
      // Fix for previously unmapped data from WordsAPI
      const fixEntry = (entry: any) => {
        if (!entry) return entry
        return {
          term: entry.term || entry.word || '',
          sound: entry.sound || (typeof entry.pronunciation === 'string' ? { all: entry.pronunciation } : entry.pronunciation),
          commonness: entry.commonness !== undefined ? entry.commonness : entry.frequency,
          syllableData: entry.syllableData || entry.syllables,
          meanings: entry.meanings || entry.results?.map((res: any) => ({
            text: res.text || res.definition,
            category: res.category || res.partOfSpeech,
            similar: res.similar || res.synonyms,
            opposite: res.opposite || res.antonyms,
            samples: res.samples || res.examples
          })) || [],
          whenFetched: entry.whenFetched,
          userKnowsIt: entry.userKnowsIt
        }
      }

      if (data.currentTerm) {
        data.currentTerm = fixEntry(data.currentTerm)
      }
      if (data.learnedTerms) {
        data.learnedTerms = data.learnedTerms.map(fixEntry)
      }
      
      return data
    }
  } catch (e) {
    console.error('Pull failed:', e)
  }
  
  return { currentTerm: null, lastGrabTime: null, learnedTerms: [] }
}

export const pushData = (data: VocabTrackerState): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Push failed:', e)
  }
}

export const insertTerm = (
  current: VocabTrackerState,
  newTerm: LearnedVocab
): VocabTrackerState => {
  return {
    ...current,
    learnedTerms: [newTerm, ...current.learnedTerms],
  }
}

export const isDifferentDay = (oldDate: string | null): boolean => {
  if (!oldDate) return true
  
  const today = new Date().toDateString()
  const old = new Date(oldDate).toDateString()
  
  return today !== old
}
