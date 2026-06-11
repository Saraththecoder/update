'use client'

import { useState, useCallback } from 'react'
import { Bookmark, Share2, Check } from 'lucide-react'
import {
  saveArticle,
  removeArticle,
  isArticleSaved,
  type Article,
} from '@/lib/constitution-helpers'

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ArticleHeaderProps {
  article: Article
  onSavedChange?: () => void
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ArticleHeader({
  article,
  onSavedChange,
}: ArticleHeaderProps) {
  const [saved, setSaved] = useState(() => isArticleSaved(article.article_id))
  const [copied, setCopied] = useState(false)

  const handleSave = useCallback(() => {
    if (saved) {
      removeArticle(article.article_id)
      setSaved(false)
    } else {
      saveArticle(article.article_id)
      setSaved(true)
    }
    onSavedChange?.()
  }, [saved, article.article_id, onSavedChange])

  const handleCopyLink = useCallback(() => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}/constitution-explorer?article=${article.article_id}`
        : ''
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [article.article_id])

  /* ---- Build status pills (max 2) ---- */
  const statusPills: { label: string; bg: string; text: string }[] = []
  if (article.upsc_importance === 'HIGH') {
    statusPills.push({ label: 'HIGH UPSC Priority', bg: '#1C1C1E', text: '#FFFFFF' })
  }
  if (article.amended) {
    statusPills.push({ label: 'Recently Amended', bg: '#E31837', text: '#1C1C1E' })
  }
  if (article.is_deleted && statusPills.length < 2) {
    statusPills.push({ label: 'Repealed', bg: '#FDEAEA', text: '#8B1A1A' })
  }

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E8E8E4',
      }}
    >
      {/* Row 1: Part pill + Chapter pill */}
      <div className="flex flex-wrap gap-2">
        <span
          className="rounded-full font-sans uppercase tracking-[1px]"
          style={{
            fontSize: 10,
            fontWeight: 500,
            padding: '3px 10px',
            background: '#E1F5EE',
            color: '#0D6E6E',
          }}
        >
          Part {article.part_id.replace('part_', '').replace('_', '.')} —{' '}
          {article.part_title}
        </span>
        {article.chapter && (
          <span
            className="rounded-full font-sans uppercase tracking-[1px]"
            style={{
              fontSize: 10,
              fontWeight: 500,
              padding: '3px 10px',
              background: '#FDF4DC',
              color: '#E31837',
            }}
          >
            {article.chapter}
          </span>
        )}
      </div>

      {/* Row 2: Article number */}
      <div className="mt-2 font-mono" style={{ fontSize: 12, color: '#3D3D3A' }}>
        Article {article.article_number}
      </div>

      {/* Row 3: Title */}
      <h1
        className="mt-1 font-serif"
        style={{
          fontSize: 28,
          fontWeight: 400,
          color: '#1C1C1E',
          lineHeight: 1.3,
        }}
      >
        {article.article_title}
      </h1>

      {/* Row 4: Status pills */}
      {statusPills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {statusPills.slice(0, 2).map((pill) => (
            <span
              key={pill.label}
              className="rounded-full font-sans uppercase tracking-[1px]"
              style={{
                fontSize: 10,
                fontWeight: 500,
                padding: '3px 10px',
                background: pill.bg,
                color: pill.text,
              }}
            >
              {pill.label}
            </span>
          ))}
        </div>
      )}

      {/* Row 5: Action links */}
      <div className="flex items-center gap-5 mt-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 font-sans transition-colors"
          style={{
            fontSize: 12,
            color: saved ? '#E31837' : '#3D3D3A',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}
          aria-label={saved ? 'Remove from saved' : 'Save for revision'}
        >
          <Bookmark
            className="w-3.5 h-3.5"
            fill={saved ? '#E31837' : 'none'}
            stroke={saved ? '#E31837' : 'currentColor'}
          />
          {saved ? 'Saved' : 'Save for revision'}
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 font-sans transition-colors"
          style={{
            fontSize: 12,
            color: copied ? '#0D6E6E' : '#3D3D3A',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Link copied
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  )
}
