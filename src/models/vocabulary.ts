export interface VocabMeaning {
  text: string
  category?: string
  similar?: string[]
  opposite?: string[]
  samples?: string[]
}

export interface VocabEntry {
  term: string
  sound?: { all?: string }
  commonness?: number
  syllableData?: { count: number; list: string[] }
  meanings?: VocabMeaning[]
}

export interface LearnedVocab extends VocabEntry {
  whenFetched: string
  userKnowsIt: boolean
}

export interface VocabTrackerState {
  currentTerm: VocabEntry | null
  lastGrabTime: string | null
  learnedTerms: LearnedVocab[]
}
