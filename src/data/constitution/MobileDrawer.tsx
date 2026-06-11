'use client'

import { useState, useCallback } from 'react'
import { X, LayoutGrid } from 'lucide-react'
import NavigationTree from './NavigationTree'
import type { FilterTag } from '@/lib/constitution-helpers'

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface MobileDrawerProps {
  selectedArticleId: string
  onSelectArticle: (articleId: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  activeFilter: FilterTag
  onFilterChange: (filter: FilterTag) => void
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MobileDrawer({
  selectedArticleId,
  onSelectArticle,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectArticle = useCallback(
    (articleId: string) => {
      onSelectArticle(articleId)
      setIsOpen(false)
    },
    [onSelectArticle]
  )

  return (
    <>
      {/* ── Closed state: Bottom bar ── */}
      {!isOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:hidden"
          style={{
            height: 52,
            background: '#1C1C1E',
          }}
        >
          <span
            className="font-sans"
            style={{ fontSize: 13, color: '#FF2D4B' }}
          >
            Navigate Constitution
          </span>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#FFFFFF',
              padding: 0,
            }}
            aria-label="Open constitution navigation"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* ── Open state: Drawer ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Constitution navigation"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer panel */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl"
            style={{
              height: '78vh',
              background: '#1C1C1E',
              animation: 'slideUp 250ms ease-out',
            }}
          >
            {/* Drawer handle bar */}
            <div className="flex justify-center pt-2 pb-1">
              <div
                className="rounded-full"
                style={{
                  width: 36,
                  height: 4,
                  background: 'rgba(255,255,255,0.2)',
                }}
              />
            </div>

            {/* Close button */}
            <div className="flex justify-end px-4 pb-1">
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                  padding: 4,
                }}
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tree content */}
            <div className="h-[calc(78vh-52px)] overflow-y-auto">
              <NavigationTree
                selectedArticleId={selectedArticleId}
                onSelectArticle={handleSelectArticle}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                activeFilter={activeFilter}
                onFilterChange={onFilterChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Slide-up animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
