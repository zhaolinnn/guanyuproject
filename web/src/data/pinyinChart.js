/**
 * Full Pinyin chart: 22 initials × 36 finals.
 * Only syllables that appear in pinyin.txt get audio; others are empty but keep cell space.
 * Audio path pattern: /sounds/pinyin/{initial}-{final}.mp3 (empty initial = "0")
 */

import pinyinTxt from './pinyin.txt?raw'

export const PINYIN_INITIALS = [
  '', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h',
  'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's',
]

export const PINYIN_FINALS = [
  'a', 'o', 'e', 'er', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'ong',
  'i', 'ia', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'iong',
  'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ueng',
  'ü', 'üe', 'üan', 'ün',
]

/** Convert (initial, final) to the spelling used in pinyin.txt (e.g. yi for 0+i, ju for j+ü) */
function toPinyinSpelling(init, fin) {
  if (!init) {
    const zeroSpelling = {
      i: 'yi', ia: 'ya', ie: 'ye', iao: 'yao', iu: 'you', ian: 'yan', in: 'yin',
      iang: 'yang', ing: 'ying', iong: 'yong',
      u: 'wu', ua: 'wa', uo: 'wo', uai: 'wai', ui: 'wei', uan: 'wan', un: 'wen',
      uang: 'wang', ueng: 'weng',
      ü: 'yu', üe: 'yue', üan: 'yuan', ün: 'yun',
    }
    return zeroSpelling[fin] ?? fin
  }
  if ((init === 'j' || init === 'q' || init === 'x') && (fin === 'ü' || fin === 'üe' || fin === 'üan' || fin === 'ün')) {
    const u = { ü: 'u', üe: 'ue', üan: 'uan', ün: 'un' }[fin]
    return init + u
  }
  return init + fin
}

/** Set of valid syllables from pinyin.txt (lowercase, split by whitespace) */
const validSyllables = new Set(
  pinyinTxt
    .split(/\s+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
)

/** Build 36×22 rows. Only syllables in pinyin.txt get src; others are empty (same cell size). */
export function buildPinyinChartRows() {
  const rows = PINYIN_FINALS.map((fin) =>
    PINYIN_INITIALS.map((init) => {
      const spelling = toPinyinSpelling(init, fin)
      const valid = validSyllables.has(spelling)
      const pathInit = init || '0'
      return {
        label: valid ? spelling : '',
        src: valid ? `/sounds/pinyin/${pathInit}-${fin}.mp3` : '',
      }
    })
  )
  return rows
}

export const PINYIN_CHART_ROWS = buildPinyinChartRows()
export const PINYIN_CHART_COLUMN_HEADERS = PINYIN_INITIALS.map((i) => i || '∅')
export const PINYIN_CHART_ROW_HEADERS = PINYIN_FINALS
