'use client'

import { useState, useCallback } from 'react'
import { ListChecks } from 'lucide-react'
import type { UPSCQuestion } from '@/lib/constitution-helpers'

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface MainsQuestionCardProps {
  question: UPSCQuestion
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MainsQuestionCard({
  question,
}: MainsQuestionCardProps) {
  const [dimensionsOpen, setDimensionsOpen] = useState(false)

  const toggleDimensions = useCallback(
    () => setDimensionsOpen((p) => !p),
    []
  )

  return (
    <div
      className="rounded-xl p-4 mb-3"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E8E8E4',
      }}
    >
      {/* Row 1: Pills */}
      <div className="flex flex-wrap gap-1.5">
        <span
          className="rounded-full font-mono"
          style={{
            fontSize: 11,
            fontWeight: 500,
            padding: '3px 10px',
            background: '#1C1C1E',
            color: '#FFFFFF',
          }}
        >
          {question.year}
        </span>
        <span
          className="rounded-full font-sans"
          style={{
            fontSize: 11,
            fontWeight: 500,
            padding: '3px 10px',
            background: '#2D2D30',
            color: '#FFFFFF',
          }}
        >
          {question.paper || 'GS II'}
        </span>
        <span
          className="rounded-full font-sans"
          style={{
            fontSize: 11,
            fontWeight: 500,
            padding: '3px 10px',
            background: '#FFFFFF',
            color: '#1C1C1E',
            border: '1px solid #1C1C1E',
          }}
        >
          {question.marks || '15'} marks
        </span>
      </div>

      {/* Row 2: Question text */}
      <div
        className="font-sans mt-3"
        style={{ fontSize: 13, color: '#1C1C1E', lineHeight: 1.7 }}
      >
        {question.question_text}
      </div>

      {/* Row 3: Answer dimensions toggle */}
      {question.answer_dimensions && question.answer_dimensions.length > 0 && (
        <div className="mt-3">
          <button
            onClick={toggleDimensions}
            className="flex items-center gap-1.5 font-sans transition-colors"
            style={{
              fontSize: 12,
              color: '#1C1C1E',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            aria-expanded={dimensionsOpen}
          >
            <ListChecks className="w-3.5 h-3.5" />
            What to cover
          </button>

          {dimensionsOpen && (
            <ul className="mt-2 space-y-1.5 pl-1">
              {question.answer_dimensions.map((dim, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="flex-shrink-0 rounded-full mt-1.5"
                    style={{
                      width: 6,
                      height: 6,
                      background: '#E31837',
                    }}
                  />
                  <span
                    className="font-sans"
                    style={{ fontSize: 12, color: '#3D3D3A' }}
                  >
                    {dim}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
