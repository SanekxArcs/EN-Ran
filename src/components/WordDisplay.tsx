import type { VocabEntry } from '@/models/vocabulary'
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card'
import { Badge } from '@/ui/Badge'
import { Volume2, Hash, TrendingUp } from 'lucide-react'

interface WordDisplayProps {
  vocabData: VocabEntry
}

export const WordDisplay = ({ vocabData }: WordDisplayProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-4xl capitalize bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {vocabData.term}
          </CardTitle>
          {vocabData.commonness && (
            <Badge variant="info" className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Frequency: {vocabData.commonness.toFixed(2)}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {vocabData.sound?.all && (
          <div className="flex items-center gap-2 text-gray-600">
            <Volume2 className="w-5 h-5 text-purple-600" />
            <span className="text-lg font-mono">{vocabData.sound.all}</span>
          </div>
        )}
        
        {vocabData.syllableData && (
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-purple-600" />
            <span className="text-gray-700">
              {vocabData.syllableData.count} syllable{vocabData.syllableData.count !== 1 ? 's' : ''}
            </span>
            {vocabData.syllableData.list.length > 0 && (
              <span className="text-gray-500 ml-2">
                ({vocabData.syllableData.list.join(' · ')})
              </span>
            )}
          </div>
        )}

        {vocabData.meanings && vocabData.meanings.length > 0 && (
          <div className="space-y-4 mt-6">
            <h4 className="font-bold text-lg text-gray-800">Definitions:</h4>
            {vocabData.meanings.map((meaning, idx) => (
              <div key={idx} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border-l-4 border-purple-500">
                {meaning.category && (
                  <Badge variant="default" className="mb-2 text-xs">
                    {meaning.category}
                  </Badge>
                )}
                <p className="text-gray-800 mb-3">{meaning.text}</p>
                
                {meaning.samples && meaning.samples.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-purple-300">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Examples:</p>
                    {meaning.samples.map((example, exIdx) => (
                      <p key={exIdx} className="text-sm text-gray-600 italic">
                        "{example}"
                      </p>
                    ))}
                  </div>
                )}
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {meaning.similar && meaning.similar.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-green-700">Similar: </span>
                      {meaning.similar.map((word, wIdx) => (
                        <Badge key={wIdx} variant="success" className="mr-1 text-xs">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {meaning.opposite && meaning.opposite.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-yellow-700">Opposite: </span>
                      {meaning.opposite.map((word, wIdx) => (
                        <Badge key={wIdx} variant="warning" className="mr-1 text-xs">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
