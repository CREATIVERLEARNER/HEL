import { motion } from 'framer-motion'

export default function DashboardCard({ title, value, children }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-4">
      <div className="text-zinc-400">{title}</div>
      <div className="mt-2 text-3xl font-bold text-red-400">{value}</div>
      {children}
    </motion.div>
  )
}
