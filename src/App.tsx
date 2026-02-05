import { useState, useEffect, useCallback } from 'react'
import type { VocabTrackerState } from '@/models/vocabulary'
import { grabRandomTerm } from '@/data-layer/api-client'
import { pullData, pushData, insertTerm, isDifferentDay } from '@/data-layer/persistence'
import { WordDisplay } from '@/components/WordDisplay'
import { HistoryList } from '@/components/HistoryList'
import { Button } from '@/ui/Button'
import { Card, CardContent } from '@/ui/Card'
import { RefreshCw, BookOpen, CheckCircle, AlertCircle } from 'lucide-react'

function App() {
  const [appState, setAppState] = useState<VocabTrackerState>(pullData())
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const fetchNewWord = useCallback(async () => {
    setLoading(true)
    setErrorMsg(null)
    
    try {
      const wordData = await grabRandomTerm()
      const newState: VocabTrackerState = {
        currentTerm: wordData,
        lastGrabTime: new Date().toISOString(),
        learnedTerms: appState.learnedTerms,
      }
      
      setAppState(newState)
      pushData(newState)
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : 'Failed to fetch word'
      if (errMessage.includes('Failed') || errMessage.includes('401') || errMessage.includes('403')) {
        setErrorMsg('API key not configured. Please add your RapidAPI key to .env file (see README.md)')
      } else {
        setErrorMsg(errMessage)
      }
    } finally {
      setLoading(false)
    }
  }, [appState.learnedTerms])

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
    
    const updatedState = insertTerm(appState, learnedWord)
    updatedState.currentTerm = null
    
    setAppState(updatedState)
    pushData(updatedState)
    
    fetchNewWord()
  }

  const markAsNew = () => {
    if (!appState.currentTerm) return
    
    const learnedWord = {
      ...appState.currentTerm,
      whenFetched: new Date().toISOString(),
      userKnowsIt: false,
    }
    
    const updatedState = insertTerm(appState, learnedWord)
    
    setAppState(updatedState)
    pushData(updatedState)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            EN-Ran Vocabulary
          </h1>
          <p className="text-white text-lg">Expand your English vocabulary daily</p>
        </div>

        {errorMsg && (
          <Card className="mb-6 bg-red-50 border-red-200">
            <CardContent className="p-4 flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span>{errorMsg}</span>
            </CardContent>
          </Card>
        )}

        {loading && (
          <Card className="mb-6">
            <CardContent className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-purple-600" />
              <p className="text-gray-600">Fetching a new word...</p>
            </CardContent>
          </Card>
        )}

        {!loading && appState.currentTerm && (
          <>
            <WordDisplay vocabData={appState.currentTerm} />
            
            <div className="flex gap-4 mb-8">
              <Button
                onClick={markAsKnown}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                I Already Know This
              </Button>
              
              <Button
                onClick={markAsNew}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Save & Continue
              </Button>
            </div>
          </>
        )}

        {!loading && !appState.currentTerm && (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Ready to learn a new word?
              </h3>
              <Button
                onClick={fetchNewWord}
                variant="primary"
                size="lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Get Today's Word
              </Button>
            </CardContent>
          </Card>
        )}

        <HistoryList history={appState.learnedTerms} />
      </div>
    </div>
  )
}

export default App
