import type { VocabEntry } from '@/models/vocabulary'
import { TrendingUp } from 'lucide-react'

interface WordDisplayProps {
  vocabData: VocabEntry
}

export const WordDisplay = ({ vocabData }: WordDisplayProps) => {
  return (
    <div className="mb-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
      <div className="p-8 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight capitalize">
              {vocabData.term}
            </h2>
            {vocabData.commonness && (
              <div className="bg-slate-50 text-[9px] font-black text-slate-400 px-2.5 py-1 rounded-lg border border-slate-100 flex items-center gap-1.5 mt-1">
                <TrendingUp className="w-3 h-3" />
                {vocabData.commonness.toFixed(1)}
              </div>
            )}
          </div>
          {vocabData.sound?.all && (
            <p className="text-base font-mono text-indigo-500/80 font-medium">
              {vocabData.sound.all}
            </p>
          )}
        </div>
      </div>
      
      <div className="p-8 pt-4 space-y-10">
        {vocabData.syllableData && vocabData.syllableData.list && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {vocabData.syllableData.list.map((s, i) => (
                <span key={i} className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-100">
                  {s}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest ml-2">
              • {vocabData.syllableData.count} Syllables
            </span>
          </div>
        )}

        {vocabData.meanings && vocabData.meanings.length > 0 && (
          <div className="space-y-10">
            {vocabData.meanings.map((meaning, idx) => (
              <div key={idx} className="relative group">
                <div className="flex items-center gap-3 mb-4">
                  {meaning.category && (
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                      {meaning.category}
                    </span>
                  )}
                  <div className="h-[1px] flex-1 bg-slate-50" />
                </div>
                
                <p className="text-lg text-slate-700 leading-snug font-semibold mb-6">
                  {meaning.text}
                </p>
                
                {meaning.samples && meaning.samples.length > 0 && (
                  <div className="space-y-3 mb-6 bg-slate-50/30 p-4 rounded-2xl border border-slate-50">
                    {meaning.samples.map((example, exIdx) => (
                      <p key={exIdx} className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-indigo-100 pl-4 py-0.5">
                        “{example}”
                      </p>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-6">
                  {meaning.similar && meaning.similar.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-300 mr-2">Synonyms</span>
                      {meaning.similar.slice(0, 3).map((word, wIdx) => (
                        <span key={wIdx} className="text-[10px] font-bold text-slate-500 border-b-2 border-slate-100 pb-0.5 cursor-default hover:text-indigo-400 transition-colors">
                          {word}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
