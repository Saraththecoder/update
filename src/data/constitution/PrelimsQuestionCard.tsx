'use client'

import { useState, useCallback } from 'react'
import type { UPSCQuestion } from '@/lib/constitution-helpers'

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface PrelimsQuestionCardProps {
  question: UPSCQuestion
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PrelimsQuestionCard({
  question,
}: PrelimsQuestionCardProps) {
  const [revealed, setRevealed] = useState(false)

  const handleReveal = useCallback(() => setRevealed(true), [])

  const options = question.options || {}
  const correctAnswer = question.correct_answer || ''

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
            background: '#FDEAEA',
            color: '#8B1A1A',
          }}
        >
          Prelims GS
        </span>
      </div>

      {/* Row 2: Question text */}
      <div
        className="font-sans mt-3"
        style={{ fontSize: 13, color: '#1C1C1E', lineHeight: 1.7 }}
      >
        {question.question_text}
      </div>

      {/* Row 3: Options */}
      <div className="mt-3 space-y-1.5">
        {Object.entries(options).map(([key, value]) => {
          const isCorrect = revealed && key === correctAnswer
          return (
            <div
              key={key}
              className="font-sans rounded-md px-3 py-1.5 transition-colors"
              style={{
                fontSize: 13,
                color: isCorrect ? '#0D6E6E' : '#1C1C1E',
                background: isCorrect ? '#E1F5EE' : 'transparent',
                fontWeight: isCorrect ? 500 : 400,
              }}
            >
              {key}. {value}
            </div>
          )
        })}
      </div>

      {/* Row 4: Reveal Answer button or Explanation */}
      {!revealed ? (
        <button
          onClick={handleReveal}
          className="mt-3 font-sans rounded-md transition-colors"
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: '8px 16px',
            border: '1px solid #1C1C1E',
            color: '#1C1C1E',
            background: 'transparent',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1C1C1E'
            e.currentTarget.style.color = '#FFFFFF'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#1C1C1E'
          }}
        >
          Reveal Answer
        </button>
      ) : (
        <div
          className="mt-3 rounded-r-md"
          style={{
            background: '#FDF4DC',
            borderLeft: '3px solid #E31837',
            padding: '8px 12px',
          }}
        >
          <div
            className="font-sans"
            style={{ fontSize: 12, color: '#1C1C1E' }}
          >
            {question.option_explanation || question.explanation || ''}
          </div>
        </div>
      )}
    </div>
  )
}
