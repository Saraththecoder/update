'use client'

import { useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Case } from '@/lib/constitution-helpers'

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface CaseCardProps {
  caseData: Case
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CaseCard({ caseData }: CaseCardProps) {
  const [expanded, setExpanded] = useState(false)

  const whatDecided = caseData.what_decided || ''
  const isTruncated = whatDecided.length > 100
  const displayText =
    isTruncated && !expanded
      ? whatDecided.slice(0, 100) + '…'
      : whatDecided

  const handleToggle = useCallback(() => setExpanded((p) => !p), [])

  return (
    <div
      className="rounded-xl p-4 mb-3"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E8E8E4',
      }}
    >
      {/* Row 1: Case name + Year */}
      <div className="flex items-start justify-between gap-2">
        <span
          className="font-sans"
          style={{ fontSize: 13, fontWeight: 500, color: '#1C1C1E' }}
        >
          {caseData.case_name}
        </span>
        <span
          className="font-mono flex-shrink-0"
          style={{ fontSize: 12, color: '#3D3D3A' }}
        >
          {caseData.year}
        </span>
      </div>

      {/* Row 2: Citation */}
      <div
        className="font-mono mt-1"
        style={{ fontSize: 11, color: '#3D3D3A', fontStyle: 'italic' }}
      >
        {caseData.citation}
      </div>

      {/* Row 3: Pills */}
      {(caseData.upsc_asked_directly || caseData.is_recent) && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {caseData.upsc_asked_directly && (
            <span
              className="rounded-full font-sans uppercase tracking-[1px]"
              style={{
                fontSize: 10,
                fontWeight: 500,
                padding: '3px 10px',
                background: '#1C1C1E',
                color: '#FFFFFF',
              }}
            >
              Asked in UPSC
            </span>
          )}
          {caseData.is_recent && (
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
              Recent Judgment
            </span>
          )}
        </div>
      )}

      {/* Row 4: What decided */}
      <div
        className="font-sans mt-2"
        style={{ fontSize: 13, color: '#1C1C1E', lineHeight: 1.7 }}
      >
        {displayText}
        {isTruncated && (
          <button
            onClick={handleToggle}
            className="ml-1 font-sans underline"
            style={{
              fontSize: 13,
              color: '#1C1C1E',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Row 5: UPSC One-liner */}
      {caseData.upsc_one_liner && (
        <div
          className="mt-3 rounded-r-md"
          style={{
            background: '#FDF4DC',
            borderLeft: '3px solid #E31837',
            padding: '8px 12px',
          }}
        >
          <div
            className="font-sans uppercase tracking-[1px]"
            style={{ fontSize: 10, color: '#3D3D3A' }}
          >
            Exam takeaway
          </div>
          <div
            className="font-sans mt-0.5"
            style={{
              fontSize: 12,
              color: '#1C1C1E',
              fontStyle: 'italic',
            }}
          >
            {caseData.upsc_one_liner}
          </div>
        </div>
      )}
    </div>
  )
}
