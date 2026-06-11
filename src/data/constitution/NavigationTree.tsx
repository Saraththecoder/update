'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import {
  buildTreeData,
  filterArticlesByTag,
  searchConstitution,
  getSavedArticles,
  removeArticle,
  getArticleById,
  type FilterTag,
  type TreeNode,
} from '@/lib/constitution-helpers'

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface NavigationTreeProps {
  selectedArticleId: string
  onSelectArticle: (articleId: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  activeFilter: FilterTag
  onFilterChange: (filter: FilterTag) => void
}

/* ------------------------------------------------------------------ */
/*  Filter pill definitions                                            */
/* ------------------------------------------------------------------ */

const FILTER_PILLS: { tag: FilterTag; label: string }[] = [
  { tag: 'all', label: 'All' },
  { tag: 'high-priority', label: 'High Priority' },
  { tag: 'fundamental-rights', label: 'Fundamental Rights' },
  { tag: 'emergency', label: 'Emergency' },
  { tag: 'centre-state', label: 'Centre\u2013State' },
  { tag: 'recently-amended', label: 'Recently Amended' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NavigationTree({
  selectedArticleId,
  onSelectArticle,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: NavigationTreeProps) {
  /* ---- manual expand / collapse state ---- */
  const [manualExpanded, setManualExpanded] = useState<Set<string>>(
    () => new Set(['part_3']) // Part III expanded by default
  )

  /* ---- saved articles: refresh counter to force re-read ---- */
  const [savedRefresh, setSavedRefresh] = useState(0)

  /* ---- search debounce ---- */
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ---- tooltip visibility state ---- */
  const [tooltipId, setTooltipId] = useState<string | null>(null)

  /* ---- tree data (memoised) ---- */
  const treeData = useMemo(() => buildTreeData(), [])

  /* ---- filtered article IDs from active filter ---- */
  const filteredArticles = useMemo(
    () => filterArticlesByTag(activeFilter),
    [activeFilter]
  )
  const filteredArticleIds = useMemo(
    () => new Set(filteredArticles.map((a) => a.article_id)),
    [filteredArticles]
  )

  /* ---- search matching ---- */
  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return null
    const results = searchConstitution(searchQuery)
    return new Set(results.map((a) => a.article_id))
  }, [searchQuery])

  /* ---- derived saved articles (re-read on refresh counter change) ---- */
  const savedArticles = useMemo(() => getSavedArticles(), [savedRefresh])

  /* ---- derived expanded parts: merge manual + auto-expand from search ---- */
  const expandedParts = useMemo(() => {
    const merged = new Set(manualExpanded)
    if (searchMatches && searchMatches.size > 0) {
      treeData.forEach((part) => {
        if (part.children) {
          const hasMatch = part.children.some(
            (child) => child.article_id && searchMatches.has(child.article_id)
          )
          if (hasMatch) merged.add(part.part_id)
        }
      })
    }
    return merged
  }, [manualExpanded, searchMatches, treeData])

  /* ---- Listen for storage events (cross-tab sync) ---- */
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'constitution_saved') {
        setSavedRefresh((n) => n + 1)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  /* ---- Debounced search handler ---- */
  const handleSearchInput = useCallback(
    (value: string) => {
      setLocalSearch(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onSearchChange(value)
      }, 200)
    },
    [onSearchChange]
  )

  /* ---- Toggle part expand/collapse ---- */
  const togglePart = useCallback((partId: string) => {
    setManualExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(partId)) next.delete(partId)
      else next.add(partId)
      return next
    })
  }, [])

  /* ---- Remove saved article ---- */
  const handleRemoveSaved = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeArticle(id)
    setSavedRefresh((n) => n + 1)
  }, [])

  /* ---- Determine if an article row should be visible at all ---- */
  const isArticleVisible = useCallback(
    (node: TreeNode): boolean => {
      if (!node.article_id) return false
      if (!filteredArticleIds.has(node.article_id)) return false
      return true
    },
    [filteredArticleIds]
  )

  /* ---- Determine opacity for article during search ---- */
  const getArticleOpacity = useCallback(
    (node: TreeNode): number => {
      if (!searchMatches) return 1
      if (node.article_id && searchMatches.has(node.article_id)) return 1
      return 0.2
    },
    [searchMatches]
  )

  /* ---- Determine opacity for part during search ---- */
  const getPartOpacity = useCallback(
    (partNode: TreeNode): number => {
      if (!searchMatches) return 1
      const hasMatch = partNode.children?.some(
        (child) => child.article_id && searchMatches.has(child.article_id)
      )
      return hasMatch ? 1 : 0.2
    },
    [searchMatches]
  )

  /* ---- Short name for saved articles ---- */
  const getShortName = useCallback((articleId: string): string => {
    const article = getArticleById(articleId)
    return article ? `Art. ${article.article_number}` : articleId
  }, [])

  return (
    <nav
      className="h-full flex flex-col font-sans overflow-hidden"
      style={{ background: '#1C1C1E' }}
      aria-label="Constitution navigation"
    >
      <style>{`
        .nav-tree-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .nav-tree-scroll::-webkit-scrollbar-track {
          background: #1C1C1E;
        }
        .nav-tree-scroll::-webkit-scrollbar-thumb {
          background: #E31837;
          border-radius: 2px;
        }
        .nav-tree-scroll::-webkit-scrollbar-thumb:hover {
          background: #FF2D4B;
        }
      `}</style>

      {/* ── Saved Articles Section ── */}
      {savedArticles.length > 0 && (
        <div className="flex-shrink-0 px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[11px] uppercase tracking-[2px] font-sans"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Saved for Revision
            </span>
            <span
              className="inline-flex items-center justify-center rounded-full text-[10px] font-sans font-medium"
              style={{
                background: '#E31837',
                color: '#1C1C1E',
                width: 18,
                height: 18,
                fontSize: 10,
              }}
            >
              {savedArticles.length}
            </span>
          </div>

          {/* Gold divider */}
          <div
            className="w-full mb-2"
            style={{ height: 1, background: '#E31837', opacity: 0.4 }}
          />

          <div className="flex flex-col gap-0.5 max-h-32 overflow-y-auto nav-tree-scroll">
            {savedArticles.map((id) => (
              <button
                key={id}
                onClick={() => onSelectArticle(id)}
                className="group flex items-center justify-between w-full text-left px-2 py-1.5 rounded transition-colors"
                style={{
                  background:
                    selectedArticleId === id
                      ? 'rgba(227,24,55,0.15)'
                      : 'transparent',
                  borderLeft:
                    selectedArticleId === id
                      ? '3px solid #E31837'
                      : '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (selectedArticleId !== id) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedArticleId !== id) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <span
                  className="text-[13px] font-sans truncate"
                  style={{
                    color:
                      selectedArticleId === id
                        ? '#FFFFFF'
                        : 'rgba(255,255,255,0.8)',
                  }}
                >
                  {getShortName(id)}
                </span>
                <X
                  className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity cursor-pointer"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  onClick={(e) => handleRemoveSaved(id, e)}
                  role="button"
                  aria-label={`Remove ${getShortName(id)} from saved`}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Search Bar ── */}
      <div className="flex-shrink-0 px-4 py-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Search articles..."
            className="w-full font-sans text-[13px] outline-none rounded-md"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              padding: '8px 12px 8px 32px',
              borderRadius: 6,
            }}
            aria-label="Search constitution articles"
          />
          {localSearch && (
            <button
              onClick={() => {
                setLocalSearch('')
                onSearchChange('')
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Pills ── */}
      <div className="flex-shrink-0 px-4 pb-3">
        <div className="flex gap-1.5 overflow-x-auto nav-tree-scroll pb-1">
          {FILTER_PILLS.map(({ tag, label }) => (
            <button
              key={tag}
              onClick={() => onFilterChange(tag)}
              className="flex-shrink-0 rounded-full font-sans uppercase tracking-[1px] transition-colors"
              style={{
                fontSize: 10,
                fontWeight: 500,
                padding: '3px 10px',
                background:
                  activeFilter === tag
                    ? '#E31837'
                    : 'rgba(255,255,255,0.1)',
                color: activeFilter === tag ? '#1C1C1E' : '#FFFFFF',
                borderRadius: 20,
              }}
              aria-pressed={activeFilter === tag}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Thin divider ── */}
      <div
        className="flex-shrink-0 mx-4 mb-1"
        style={{ height: 1, background: 'rgba(255,255,255,0.08)' }}
      />

      {/* ── Tree ── */}
      <div className="flex-1 overflow-y-auto nav-tree-scroll px-2 pb-4">
        {treeData.map((partNode) => {
          const isExpanded = expandedParts.has(partNode.part_id)
          const partOpacity = getPartOpacity(partNode)

          // Filter children for visibility
          const visibleChildren = partNode.children?.filter((child) =>
            isArticleVisible(child)
          )

          // Hide parts with no visible children (unless no filter active)
          if (activeFilter !== 'all' && (!visibleChildren || visibleChildren.length === 0)) {
            return null
          }

          return (
            <div key={partNode.part_id} style={{ opacity: partOpacity }}>
              {/* ── Part Row (Level 1) ── */}
              <button
                onClick={() => togglePart(partNode.part_id)}
                className="w-full flex items-center justify-between text-left px-3 py-2 rounded transition-colors group"
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
                aria-expanded={isExpanded}
                aria-label={`Part ${partNode.part_number} \u2014 ${partNode.part_title}`}
              >
                <span
                  className="font-sans uppercase tracking-[2px] truncate pr-2"
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  Part {partNode.part_number} — {partNode.part_title}{' '}
                  <span style={{ opacity: 0.6 }}>
                    (Art. {partNode.article_range})
                  </span>
                </span>
                <ChevronDown
                  className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  }}
                />
              </button>

              {/* ── Article Rows (Level 3) ── */}
              {isExpanded && visibleChildren?.map((articleNode) => {
                if (!articleNode.article_id) return null

                const isSelected = selectedArticleId === articleNode.article_id
                const articleOpacity = getArticleOpacity(articleNode)
                const isDeleted = articleNode.is_deleted === true
                const isHighPriority = articleNode.upsc_importance === 'HIGH'

                return (
                  <div
                    key={articleNode.article_id}
                    style={{ opacity: articleOpacity }}
                  >
                    <button
                      onClick={() => onSelectArticle(articleNode.article_id!)}
                      className="w-full flex items-center gap-1.5 text-left transition-colors rounded"
                      style={{
                        padding: '5px 12px 5px 20px',
                        background: isSelected
                          ? 'rgba(227,24,55,0.15)'
                          : 'transparent',
                        borderLeft: isSelected
                          ? '3px solid #E31837'
                          : '3px solid transparent',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background =
                            'rgba(255,255,255,0.08)'
                          const textEl =
                            e.currentTarget.querySelector('[data-art-text]')
                          if (textEl) textEl.style.color = '#FFFFFF'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = 'transparent'
                          const textEl =
                            e.currentTarget.querySelector('[data-art-text]')
                          if (textEl)
                            textEl.style.color = 'rgba(255,255,255,0.8)'
                        }
                      }}
                      aria-label={`Art. ${articleNode.article_number} \u2014 ${articleNode.article_title}${isDeleted ? ' (Repealed)' : ''}`}
                    >
                      {/* HIGH priority gold dot */}
                      {isHighPriority ? (
                        <span
                          className="relative flex-shrink-0"
                          onMouseEnter={() =>
                            setTooltipId(articleNode.article_id!)
                          }
                          onMouseLeave={() => setTooltipId(null)}
                        >
                          <span
                            className="block rounded-full"
                            style={{
                              width: 6,
                              height: 6,
                              background: '#E31837',
                            }}
                          />
                          {tooltipId === articleNode.article_id && (
                            <span
                              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 px-2 py-1 rounded whitespace-nowrap font-sans pointer-events-none"
                              style={{
                                fontSize: 10,
                                background: '#1C1C1E',
                                color: '#FFFFFF',
                                zIndex: 50,
                              }}
                            >
                              High UPSC frequency
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="w-1.5 flex-shrink-0" />
                      )}

                      <span
                        data-art-text
                        className="font-sans truncate"
                        style={{
                          fontSize: 13,
                          color: isSelected
                            ? '#FFFFFF'
                            : 'rgba(255,255,255,0.8)',
                          fontStyle: isDeleted ? 'italic' : 'normal',
                        }}
                      >
                        Art. {articleNode.article_number} —{' '}
                        {articleNode.article_title}
                        {isDeleted && (
                          <span
                            className="ml-1 font-sans"
                            style={{ fontSize: 10, opacity: 0.6 }}
                          >
                            [Rep.]
                          </span>
                        )}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
