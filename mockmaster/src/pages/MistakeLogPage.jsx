import { useMockStore } from '../store/useMockStore.js'

export default function MistakeLogPage() {
  const { mistakeLog, markImproved, addNote } = useMockStore()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mistake Log</h1>
      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/50 text-zinc-400">
            <tr>
              <th className="p-3">Topic</th>
              <th className="p-3">Accuracy %</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Last Seen</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mistakeLog.map((row, idx) => (
              <tr key={idx} className="border-t border-red-500/10">
                <td className="p-3">{row.topic}</td>
                <td className="p-3">{row.accuracy?.toFixed?.(1) ?? row.accuracy}%</td>
                <td className="p-3 text-zinc-300">{row.notes || '-'}</td>
                <td className="p-3 text-zinc-400">{row.lastSeen || '-'}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => markImproved(idx)} className="neon-btn">✅ Mark as Improved</button>
                  <button onClick={() => {
                    const note = prompt('Add note')
                    if (note) addNote(idx, note)
                  }} className="neon-btn">📝 Add Note</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
