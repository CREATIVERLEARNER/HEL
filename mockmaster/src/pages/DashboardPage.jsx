import { motion } from 'framer-motion'
import { useMockStore } from '../store/useMockStore.js'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { mocks, stats, streak } = useMockStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link to="/import" className="neon-btn">➕ Add New Mock</Link>
          <Link to="/analytics" className="neon-btn">📊 View Analytics</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-4">
          <div className="text-zinc-400">Total Mocks Taken</div>
          <div className="mt-2 text-3xl font-bold text-red-400">{mocks.length}</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-4">
          <div className="text-zinc-400">Average Score</div>
          <div className="mt-2 text-3xl font-bold text-red-400">{stats.averageScore.toFixed(1)}</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-4">
          <div className="text-zinc-400">Accuracy %</div>
          <div className="mt-2 text-3xl font-bold text-red-400">{stats.averageAccuracy.toFixed(1)}%</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-4">
          <div className="text-zinc-400">Study Streak</div>
          <div className="mt-2 text-3xl font-bold text-red-400">🔥 {streak} days</div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-2">Daily Motivation</h2>
        <p className="text-zinc-300">"Analyze. Adapt. Ascend." Keep pushing—SSC CHSL 2025 is yours.</p>
      </motion.div>
    </div>
  )
}
