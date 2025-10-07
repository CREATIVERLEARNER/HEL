import { useMockStore } from '../store/useMockStore.js'

const SECTIONS = {
  English: ['Error Spotting', 'Fill in the Blanks', 'Cloze Test', 'Synonyms/Antonyms'],
  Quant: ['Number System', 'Percentages', 'Profit & Loss', 'Simple/Compound Interest'],
  Reasoning: ['Analogy', 'Classification', 'Series', 'Coding-Decoding'],
  GA: ['History', 'Geography', 'Polity', 'Current Affairs'],
}

export default function SyllabusTrackerPage() {
  const { syllabus, toggleTopicStatus, streak } = useMockStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Syllabus Tracker</h1>
        <div className="text-red-400 font-semibold">🔥 {streak} Days Consistent Revision!</div>
      </div>
      <div className="space-y-6">
        {Object.entries(SECTIONS).map(([section, topics]) => (
          <div key={section} className="glass-card p-4">
            <h2 className="font-semibold mb-3">{section}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {topics.map((topic) => {
                const status = syllabus[topic] || 'Pending'
                return (
                  <div key={topic} className="p-3 rounded-lg border border-red-500/20 bg-black/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{topic}</div>
                        <div className="text-xs text-zinc-400">{status}</div>
                      </div>
                      <div className="flex gap-2">
                        {['Pending','Revising','Completed'].map(s => (
                          <button key={s} onClick={() => toggleTopicStatus(topic, s)} className={`px-2 py-1 rounded text-xs ${status===s ? 'bg-red-600 text-black' : 'bg-zinc-800 text-zinc-200'}`}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 h-2 bg-zinc-800 rounded">
                      <div className={`h-2 rounded bg-red-600 transition-all`} style={{ width: status==='Completed'? '100%' : status==='Revising'? '50%' : '10%' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
