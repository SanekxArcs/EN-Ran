import type { LearnedVocab } from '@/models/vocabulary'
import { Clock, CheckCircle } from 'lucide-react'

interface HistoryListProps {
  history: LearnedVocab[]
}

export const HistoryList = ({ history }: HistoryListProps) => {
  if (history.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-3xl border border-slate-50 shadow-sm">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          Library is empty
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {history.map((item, idx) => (
        <div
          key={idx}
          className="group relative bg-white p-5 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h4 className="font-black text-slate-900 capitalize truncate">
                  {item.term || "Unknown Term"}
                </h4>
                {item.userKnowsIt && (
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                )}
              </div>
              {item.meanings && item.meanings.length > 0 && (
                <p className="text-xs text-slate-400 line-clamp-1 font-medium leading-relaxed mb-3">
                  {item.meanings[0].text}
                </p>
              )}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-slate-300">
                  <Clock className="w-2.5 h-2.5" />
                  {new Intl.DateTimeFormat('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  }).format(new Date(item.whenFetched))}
                </div>
                {item.sound?.all && (
                  <span className="text-[9px] font-mono text-slate-200">
                    {item.sound.all}
                  </span>
                )}
              </div>
            </div>
            
            <div className="shrink-0">
              <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                item.userKnowsIt 
                ? 'bg-indigo-50 text-indigo-500 border border-indigo-100/50' 
                : 'bg-slate-50 text-slate-400 border border-slate-100'
              }`}>
                {item.userKnowsIt ? 'Mastered' : 'Studying'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
