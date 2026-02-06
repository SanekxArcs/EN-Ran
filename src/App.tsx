import { useState, useEffect, useCallback, useMemo } from 'react'
import type { VocabTrackerState } from '@/models/vocabulary'
import { grabRandomTerm } from '@/data-layer/api-client'
import { pullData, pushData, insertTerm, isDifferentDay } from '@/data-layer/persistence'
import { WordDisplay } from '@/components/WordDisplay'
import { HistoryList } from '@/components/HistoryList'
import { Button } from '@/ui/Button'
import { RefreshCw, BookOpen, CheckCircle, History } from 'lucide-react'

function App() {
  const [appState, setAppState] = useState<VocabTrackerState>(pullData())
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const isAlreadyInHistory = useMemo(() => {
    if (!appState.currentTerm) return false
    return appState.learnedTerms.some(t => t.term.toLowerCase() === appState.currentTerm?.term.toLowerCase())
  }, [appState.currentTerm, appState.learnedTerms])

  const fetchNewWord = useCallback(async () => {
    setLoading(true)
    setErrorMsg(null)
    
    try {
      const wordData = await grabRandomTerm()
      
      setAppState(prev => {
        const next = {
          ...prev,
          currentTerm: wordData,
          lastGrabTime: new Date().toISOString(),
        }
        pushData(next)
        return next
      })
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : 'Failed to fetch word'
      if (errMessage.includes('Failed') || errMessage.includes('401') || errMessage.includes('403')) {
        setErrorMsg('API key not configured. Please add your Mashape API key to .env file (see README.md)')
      } else {
        setErrorMsg(errMessage)
      }
    } finally {
      setLoading(false)
    }
  }, []) // Removed dependency on appState.learnedTerms

  useEffect(() => {
    const checkAndFetch = async () => {
      if (isDifferentDay(appState.lastGrabTime) && !appState.currentTerm) {
        await fetchNewWord()
      }
    }
    checkAndFetch()
  }, [appState.lastGrabTime, appState.currentTerm, fetchNewWord])

  const markAsKnown = () => {
    if (!appState.currentTerm) return
    
    const learnedWord = {
      ...appState.currentTerm,
      whenFetched: new Date().toISOString(),
      userKnowsIt: true,
    }
    
    setAppState(prev => {
      const next = insertTerm(prev, learnedWord)
      next.currentTerm = null
      pushData(next)
      return { ...next }
    })
    
    fetchNewWord()
  }

  const markAsNew = () => {
    if (!appState.currentTerm) return
    
    const learnedWord = {
      ...appState.currentTerm,
      whenFetched: new Date().toISOString(),
      userKnowsIt: false,
    }
    
    setAppState(prev => {
      const next = insertTerm(prev, learnedWord)
      next.currentTerm = null
      pushData(next)
      return { ...next }
    })

    fetchNewWord()
  }

  return (
    <div className="min-h-svh bg-slate-50">
      <div className="max-w-xl mx-auto py-12 px-6">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            EN-Ran
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Daily curated English vocabulary.
          </p>
        </header>

        <main className="space-y-8">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {errorMsg}
            </div>
          )}

          {loading && (
            <div className="py-20 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500 mb-4" />
              <p className="text-sm font-medium text-slate-400">Loading today's word…</p>
            </div>
          )}

          {!loading && appState.currentTerm && (
            <div className="space-y-6">
              {isAlreadyInHistory && (
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-4">
                  <div className="bg-amber-100 p-2 rounded-xl">
                    <History className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-amber-800">Review Term</h4>
                    <p className="text-xs text-amber-700/80 font-medium">You've studied this term before.</p>
                  </div>
                </div>
              )}
              <WordDisplay vocabData={appState.currentTerm} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={markAsKnown}
                  className="bg-slate-900 hover:bg-black text-white h-14 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98]"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Mastered this
                </Button>
                
                <Button
                  onClick={markAsNew}
                  className="bg-white border-2 border-slate-100 hover:border-indigo-100 text-slate-600 hover:text-indigo-600 h-14 rounded-2xl shadow-sm transition-all active:scale-[0.98]"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Still Learning
                </Button>
              </div>
            </div>
          )}

          {!loading && !appState.currentTerm && (
            <div className="mb-16 py-16 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm border-dashed">
              <div className="bg-indigo-50 w-20 h-20 rounded-4xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <BookOpen className="w-10 h-10 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">
                Session Complete
              </h3>
              <p className="text-xs text-slate-400 mb-8 max-w-50 mx-auto leading-relaxed">
                Consistency is the bridge between goals and accomplishment.
              </p>
              <Button
                onClick={fetchNewWord}
                className="h-11 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-2" />
                Next Term
              </Button>
            </div>
          )}

          <section>
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                Study Journal
              </h2>
              {appState.learnedTerms.length > 0 && (
                <span className="text-[10px] font-bold text-slate-400">
                  {appState.learnedTerms.length} Terms
                </span>
              )}
            </div>
            <HistoryList history={appState.learnedTerms} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
