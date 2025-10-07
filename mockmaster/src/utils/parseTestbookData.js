// Simple parser to extract fields from Testbook-like raw text
export function parseTestbookData(raw) {
  if (!raw || typeof raw !== 'string') return null
  const text = raw.replace(/\r/g, '').trim()
  if (!text) return null

  const num = (m) => m ? Number(m.replace(/[^\d.]/g, '')) : 0
  const toList = (label) => {
    const r = new RegExp(`${label}\s*:\s*([\s\S]*?)(?:\n\n|$)`, 'i')
    const m = text.match(r)
    if (!m) return []
    return m[1]
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter(Boolean)
  }

  const rank = (() => {
    const m = text.match(/Rank\s*[:\-]\s*(\d+)/i)
    return num(m?.[1])
  })()

  const total_candidates = (() => {
    const m = text.match(/Out of\s*(\d+)/i) || text.match(/Total Candidates\s*[:\-]\s*(\d+)/i)
    return num(m?.[1])
  })()

  const score = (() => {
    const m = text.match(/Score\s*[:\-]\s*([\d.]+)/i)
    return Number(m?.[1] ?? 0)
  })()

  const max_score = (() => {
    const m = text.match(/Max\s*Score\s*[:\-]\s*([\d.]+)/i)
    return Number(m?.[1] ?? 200)
  })()

  const accuracy = (() => {
    const m = text.match(/Accuracy\s*[:\-]\s*([\d.]+)%/i)
    return Number(m?.[1] ?? 0)
  })()

  const attempted = (() => {
    const m = text.match(/Attempt(?:ed)?\s*[:\-]\s*(\d+)/i)
    return Number(m?.[1] ?? 0)
  })()

  const percentile = (() => {
    const m = text.match(/Percentile\s*[:\-]\s*([\d.]+)/i)
    return Number(m?.[1] ?? 0)
  })()

  const time = (() => {
    const m = text.match(/Time\s*[:\-]\s*([\d:]+)/i)
    return m?.[1] || ''
  })()

  const sectionBlock = (name) => {
    const r = new RegExp(`${name}[^\n]*\n([\s\S]*?)(?:\n\n|$)`, 'i')
    const m = text.match(r)
    if (!m) return null
    const chunk = m[1]
    const s = chunk.match(/Score\s*[:\-]\s*([\d.]+)/i)
    const a = chunk.match(/Accuracy\s*[:\-]\s*([\d.]+)%/i)
    return { score: Number(s?.[1] ?? 0), accuracy: Number(a?.[1] ?? 0) }
  }

  const sections = {}
  ;['English','Reasoning','Quant','GA','General Awareness','General Intelligence'].forEach((label) => {
    const key = label === 'General Awareness' ? 'GA' : (label === 'General Intelligence' ? 'Reasoning' : label)
    const b = sectionBlock(label)
    if (b) sections[key] = b
  })

  const weak_topics = toList('Weak Topics|Weak Areas|Weaknesses')
  const strengths = toList('Strong Topics|Strengths')

  const correctWrongSkipped = (() => {
    const c = num(text.match(/Correct\s*[:\-]\s*(\d+)/i)?.[1])
    const w = num(text.match(/Wrong\s*[:\-]\s*(\d+)/i)?.[1])
    const s = num(text.match(/Skipped\s*[:\-]\s*(\d+)/i)?.[1])
    return { correct: c, wrong: w, skipped: s }
  })()

  return {
    rank, total_candidates, score, max_score, accuracy, attempted, percentile,
    sections, weak_topics, strengths, time, ...correctWrongSkipped,
  }
}
