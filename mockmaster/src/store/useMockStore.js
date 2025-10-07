import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultStats = { averageScore: 0, averageAccuracy: 0 }

export const useMockStore = create(persist((set, get) => ({
  mocks: [],
  stats: defaultStats,
  streak: 0,
  mistakeLog: [],
  syllabus: {},

  addMock: (mock) => {
    const mocks = [...get().mocks, { ...mock, createdAt: Date.now() }]
    const averageScore = mocks.reduce((a, b) => a + (Number(b.score) || 0), 0) / (mocks.length || 1)
    const averageAccuracy = mocks.reduce((a, b) => a + (Number(b.accuracy) || 0), 0) / (mocks.length || 1)

    // Auto-fill mistake log from weak topics
    const newMistakes = (mock.weak_topics || []).map(t => ({ topic: t, accuracy: 0, notes: '', lastSeen: new Date().toLocaleDateString() }))

    // Update streak if at least one mock today
    const lastMock = mocks[mocks.length - 1]
    let streak = get().streak
    if (lastMock) {
      const last = new Date(lastMock.createdAt)
      const today = new Date()
      const diff = Math.floor((today - last) / (1000*60*60*24))
      if (diff === 0) streak = Math.max(1, streak)
      else if (diff === 1) streak = streak + 1
      else streak = 1
    }

    set({
      mocks,
      stats: { averageScore, averageAccuracy },
      mistakeLog: [...get().mistakeLog, ...newMistakes],
      streak,
    })
  },

  markImproved: (index) => set(state => {
    const next = [...state.mistakeLog]
    next[index] = { ...next[index], improved: true }
    return { mistakeLog: next }
  }),

  addNote: (index, note) => set(state => {
    const next = [...state.mistakeLog]
    next[index] = { ...next[index], notes: [next[index].notes, note].filter(Boolean).join(' | ') }
    return { mistakeLog: next }
  }),

  toggleTopicStatus: (topic, status) => set(state => ({
    syllabus: { ...state.syllabus, [topic]: status }
  })),

}), { name: 'mockmaster-store' }))
