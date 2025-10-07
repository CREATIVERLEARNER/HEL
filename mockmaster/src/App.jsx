import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './index.css'
import DashboardPage from './pages/DashboardPage.jsx'
import QuickImportPage from './pages/QuickImportPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import MistakeLogPage from './pages/MistakeLogPage.jsx'
import SyllabusTrackerPage from './pages/SyllabusTrackerPage.jsx'

function Navbar() {
  const linkBase = 'px-3 py-2 rounded-md transition-colors';
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-red-500/20 bg-black/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-red-600 shadow-neon grid place-items-center text-black font-extrabold">M</div>
          <div className="text-lg font-bold tracking-wide">
            <span className="text-white">Mock</span>
            <span className="text-red-500">Master</span>
            <span className="ml-2 text-sm text-zinc-400">SSC CHSL 2025</span>
          </div>
        </div>
        <div className="flex gap-2 text-sm">
          <NavLink to="/" end className={({isActive}) => `${linkBase} ${isActive ? 'bg-red-600 text-black' : 'text-zinc-300 hover:text-white hover:bg-red-600/10'}`}>Dashboard</NavLink>
          <NavLink to="/import" className={({isActive}) => `${linkBase} ${isActive ? 'bg-red-600 text-black' : 'text-zinc-300 hover:text-white hover:bg-red-600/10'}`}>Quick Import</NavLink>
          <NavLink to="/analytics" className={({isActive}) => `${linkBase} ${isActive ? 'bg-red-600 text-black' : 'text-zinc-300 hover:text-white hover:bg-red-600/10'}`}>Analytics</NavLink>
          <NavLink to="/mistakes" className={({isActive}) => `${linkBase} ${isActive ? 'bg-red-600 text-black' : 'text-zinc-300 hover:text-white hover:bg-red-600/10'}`}>Mistake Log</NavLink>
          <NavLink to="/syllabus" className={({isActive}) => `${linkBase} ${isActive ? 'bg-red-600 text-black' : 'text-zinc-300 hover:text-white hover:bg-red-600/10'}`}>Syllabus</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/import" element={<QuickImportPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/mistakes" element={<MistakeLogPage />} />
            <Route path="/syllabus" element={<SyllabusTrackerPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
