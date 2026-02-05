import type { LearnedVocab } from '@/models/vocabulary'
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card'
import { Badge } from '@/ui/Badge'
import { Clock, CheckCircle, XCircle } from 'lucide-react'

interface HistoryListProps {
  history: LearnedVocab[]
}

export const HistoryList = ({ history }: HistoryListProps) => {
  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          <p>No words learned yet. Start your vocabulary journey!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Learning History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-l-4 border-purple-500 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-lg capitalize text-gray-900">
                  {item.term}
                </h4>
                {item.meanings && item.meanings.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.meanings[0].text}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {new Date(item.whenFetched).toLocaleDateString()}
                </div>
              </div>
              <div className="ml-4">
                {item.userKnowsIt ? (
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Known
                  </Badge>
                ) : (
                  <Badge variant="info" className="flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    New
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
