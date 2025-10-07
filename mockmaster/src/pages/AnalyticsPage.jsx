import { useMemo } from 'react'
import { useMockStore } from '../store/useMockStore.js'
import { LineChart, Line, XAxis, YAxis, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Bar, BarChart, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#FF1E1E', '#EF4444', '#991B1B', '#7F1D1D']

export default function AnalyticsPage() {
  const { mocks } = useMockStore()

  const scoreTrend = mocks.map((m, i) => ({ name: `Mock ${i+1}`, score: m.score }))

  const subjectAccuracy = useMemo(() => {
    if (mocks.length === 0) return []
    const latest = mocks[mocks.length - 1]
    return Object.entries(latest.sections || {}).map(([k, v]) => ({ subject: k, accuracy: Number(v.accuracy || 0) }))
  }, [mocks])

  const rankDist = mocks.map((m, i) => ({ name: `M${i+1}`, rank: m.rank || 0 }))

  const attempts = useMemo(() => {
    if (mocks.length === 0) return []
    const latest = mocks[mocks.length - 1]
    const attempted = Number(latest.attempted || 0)
    const skipped = Math.max(0, 100 - attempted)
    return [
      { name: 'Attempted', value: attempted },
      { name: 'Skipped', value: skipped },
    ]
  }, [mocks])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-4">
          <h2 className="font-semibold mb-2">Score Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreTrend}>
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,30,30,0.3)' }} />
                <Line type="monotone" dataKey="score" stroke="#FF1E1E" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card p-4">
          <h2 className="font-semibold mb-2">Subject Accuracy</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={subjectAccuracy}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" />
                <PolarRadiusAxis stroke="#a1a1aa" />
                <Radar dataKey="accuracy" stroke="#FF1E1E" fill="#FF1E1E" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card p-4">
          <h2 className="font-semibold mb-2">Rank Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankDist}>
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,30,30,0.3)' }} />
                <Bar dataKey="rank" fill="#FF1E1E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card p-4">
          <h2 className="font-semibold mb-2">Attempt Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attempts} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80}>
                  {attempts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,30,30,0.3)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
