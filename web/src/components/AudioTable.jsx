import { useRef, useState } from 'react'

/**
 * A single cell: optional label + play button that plays the given audio src.
 * compact: smaller padding, button, and text for dense charts (e.g. 36×22).
 */
function AudioCell({ label, src, disabled, compact }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    if (!src || disabled) return
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      audio.currentTime = 0
    }
    audio.src = src
    audio.play().catch(() => {})
    setPlaying(true)
  }

  return (
    <td className={compact ? 'p-0.5 border border-black/10 bg-white' : 'p-2 border border-black/10 bg-white'}>
      <div className={`flex flex-col items-center justify-center gap-0.5 ${compact ? 'min-h-[32px]' : 'min-h-[52px]'}`}>
        {label != null && label !== '' && (
          <span className={compact ? 'font-rethink text-xs text-black/80 leading-tight' : 'font-rethink text-sm text-black/80'}>{label}</span>
        )}
        <button
          type="button"
          onClick={handlePlay}
          disabled={disabled || !src}
          className={`flex items-center justify-center rounded-full text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40 ${compact ? 'w-5 h-5' : 'w-10 h-10'}`}
          style={{ backgroundColor: src && !disabled ? 'rgb(0, 168, 107)' : '#ccc' }}
          aria-label={src ? `Play ${label || 'audio'}` : 'No audio'}
        >
          <svg
            className={compact ? 'w-2 h-2 ml-0.5' : 'w-5 h-5 ml-0.5'}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      <audio
        ref={audioRef}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        className="hidden"
      />
    </td>
  )
}

/**
 * Visual table of cells; each cell has an optional label and a clickable audio button.
 *
 * @param {Object} props
 * @param {Array<Array<{ label?: string, src: string }>>} props.rows - 2D array: rows of cells. Each cell is { label?, src }. Use src: '' for empty cells.
 * @param {string[]} [props.columnHeaders] - Optional header labels for each column
 * @param {string[]} [props.rowHeaders] - Optional header labels for each row (first column)
 * @param {string} [props.title] - Optional title above the table
 * @param {string} [props.className] - Extra class for the wrapper
 * @param {boolean} [props.compact] - Smaller cells and buttons for dense charts (e.g. 36×22)
 */
export function AudioTable({ rows, columnHeaders, rowHeaders, title, className = '', compact = false }) {
  return (
    <div className={`font-rethink flex flex-col min-h-0 ${className}`}>
      {title && (
        <h3 className={compact ? 'text-sm font-semibold text-black mb-2 flex-shrink-0' : 'text-lg font-semibold text-black mb-3 flex-shrink-0'}>{title}</h3>
      )}
      <div className="overflow-auto rounded-lg border border-black/10 shadow-sm flex-1 min-h-0">
        <table className="w-full border-collapse min-w-0">
          <thead className="sticky top-0 z-10 bg-white">
            {columnHeaders && columnHeaders.length > 0 && (
              <tr>
                {rowHeaders && rowHeaders.length > 0 && (
                  <th className={compact ? 'p-0.5 border border-black/10 bg-white text-[10px] font-medium text-black/80 sticky left-0 z-10' : 'p-2 border border-black/10 bg-white text-sm font-medium text-black/80'} />
                )}
                {columnHeaders.map((h, i) => (
                  <th key={i} className={compact ? 'p-0.5 border border-black/10 bg-white text-[10px] font-medium text-black/80' : 'p-2 border border-black/10 bg-white text-sm font-medium text-black/80'}>
                    {h}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {rowHeaders && rowHeaders[rowIndex] != null && (
                  <th className={compact ? 'p-0.5 border border-black/10 bg-black/5 text-[10px] font-medium text-black/80 sticky left-0 z-10 bg-white' : 'p-2 border border-black/10 bg-black/5 text-sm font-medium text-black/80'}>
                    {rowHeaders[rowIndex]}
                  </th>
                )}
                {row.map((cell, colIndex) => (
                  <AudioCell
                    key={colIndex}
                    label={cell?.label}
                    src={cell?.src ?? ''}
                    disabled={!cell?.src}
                    compact={compact}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
