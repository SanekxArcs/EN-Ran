import type { LearnedVocab, VocabTrackerState } from '@/models/vocabulary'

const KEY = 'vocab_tracker_enran'

export const pullData = (): VocabTrackerState => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
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
