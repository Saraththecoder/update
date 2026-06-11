'use client'

import { useState, useMemo } from 'react'
import CaseCard from './CaseCard'
import MainsQuestionCard from './MainsQuestionCard'
import PrelimsQuestionCard from './PrelimsQuestionCard'
import {
  getCasesByArticle,
  getQuestionsByArticle,
} from '@/lib/constitution-helpers'

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ContextPanelProps {
  articleId: string
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContextPanel({ articleId }: ContextPanelProps) {
  const [activeTab, setActiveTab] = useState<'cases' | 'questions'>('cases')

  const relatedCases = useMemo(
    () => getCasesByArticle(articleId).sort((a, b) => b.year - a.year),
    [articleId]
  )
  const relatedQuestions = useMemo(
    () => getQuestionsByArticle(articleId),
    [articleId]
  )

  const mainsQuestions = relatedQuestions.filter((q) => q.exam_type === 'Mains')
  const prelimsQuestions = relatedQuestions.filter(
    (q) => q.exam_type === 'Prelims'
  )

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: '#FFFFFF',
        borderLeft: '1px solid #E8E8E4',
      }}
    >
      {/* ── Tabs ── */}
      <div
        className="flex items-center gap-4 px-6 pt-5 border-b flex-shrink-0"
        style={{ borderColor: '#E8E8E4' }}
      >
        <TabButton
          label="SC Judgments"
          count={relatedCases.length}
          active={activeTab === 'cases'}
          onClick={() => setActiveTab('cases')}
        />
        <TabButton
          label="UPSC Questions"
          count={relatedQuestions.length}
          active={activeTab === 'questions'}
          onClick={() => setActiveTab('questions')}
        />
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'cases' ? (
          relatedCases.length === 0 ? (
            <EmptyState text="No landmark Supreme Court judgment has specifically interpreted this Article in our database." />
          ) : (
            relatedCases.map((c) => (
              <CaseCard key={c.case_id} caseData={c} />
            ))
          )
        ) : relatedQuestions.length === 0 ? (
          <EmptyState text="This Article has not been directly referenced in a UPSC question between 2011 and 2024 in our database." />
        ) : (
          <>
            {mainsQuestions.length > 0 && (
              <div className="mb-6">
                <div
                  className="font-sans uppercase tracking-[2px] mb-3"
                  style={{ fontSize: 10, color: '#3D3D3A' }}
                >
                  Mains Questions
                </div>
                {mainsQuestions.map((q) => (
                  <MainsQuestionCard key={q.question_id} question={q} />
                ))}
              </div>
            )}
            {prelimsQuestions.length > 0 && (
              <div>
                <div
                  className="font-sans uppercase tracking-[2px] mb-3"
                  style={{ fontSize: 10, color: '#3D3D3A' }}
                >
                  Prelims Questions
                </div>
                {prelimsQuestions.map((q) => (
                  <PrelimsQuestionCard key={q.question_id} question={q} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Tab button helper                                                  */
/* ------------------------------------------------------------------ */

function TabButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 pb-2 font-sans transition-colors"
      style={{
        fontSize: 13,
        color: active ? '#1C1C1E' : '#3D3D3A',
        borderBottom: active ? '2px solid #E31837' : '2px solid transparent',
        background: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        cursor: 'pointer',
        fontWeight: active ? 500 : 400,
      }}
    >
      {label}
      <span
        className="inline-flex items-center justify-center rounded-full font-sans"
        style={{
          width: 18,
          height: 18,
          fontSize: 11,
          background: '#1C1C1E',
          color: '#FFFFFF',
        }}
      >
        {count}
      </span>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Empty state helper                                                 */
/* ------------------------------------------------------------------ */

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-12 text-center">
      <p
        className="font-serif italic px-4"
        style={{ fontSize: 14, color: '#3D3D3A' }}
      >
        {text}
      </p>
    </div>
  )
}
