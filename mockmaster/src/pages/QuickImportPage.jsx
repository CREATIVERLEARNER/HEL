import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMockStore } from '../store/useMockStore.js'
import { parseTestbookData } from '../utils/parseTestbookData.js'

export default function QuickImportPage() {
  const [raw, setRaw] = useState('')
  const [loading, setLoading] = useState(false)
  const addMock = useMockStore(s => s.addMock)

  const onAnalyze = () => {
    setLoading(true)
    setTimeout(() => {
      const parsed = parseTestbookData(raw)
      if (parsed) {
        addMock(parsed)
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quick Import</h1>

      <div className="relative glass-card p-4">
        <label className="block text-sm text-zinc-400 mb-2">Paste your Testbook result here ⬇️</label>
        <textarea
          className="neon-input w-full h-56 p-3"
          placeholder="Paste raw text..."
          value={raw}
          onChange={e => setRaw(e.target.value)}
        />
        {loading && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 w-1/3 bg-red-500/10 blur-xl animate-scan" />
          </div>
        )}
        <div className="mt-3">
          <button onClick={onAnalyze} className="neon-btn">Analyze Now</button>
        </div>
      </div>
    </div>
  )
}
