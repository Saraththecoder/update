'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, Feather } from 'lucide-react'
import ArticleHeader from './ArticleHeader'
import CaseCard from './CaseCard'
import MainsQuestionCard from './MainsQuestionCard'
import PrelimsQuestionCard from './PrelimsQuestionCard'
import ScheduleModal from './ScheduleModal'
import {
  getArticleById,
  getCasesByArticle,
  getQuestionsByArticle,
  getSchedulesByArticle,
  type Article,
  type Schedule,
} from '@/lib/constitution-helpers'

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ArticleDetailProps {
  articleId: string
  onSelectArticle: (articleId: string) => void
  onSavedChange?: () => void
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ArticleDetail({
  articleId,
  onSelectArticle,
  onSavedChange,
}: ArticleDetailProps) {
  const [amendmentOpen, setAmendmentOpen] = useState(false)
  const [scheduleModal, setScheduleModal] = useState<Schedule | null>(null)

  const article = useMemo(() => getArticleById(articleId), [articleId])
  const relatedCases = useMemo(
    () => getCasesByArticle(articleId).sort((a, b) => b.year - a.year),
    [articleId]
  )
  const relatedQuestions = useMemo(
    () => getQuestionsByArticle(articleId),
    [articleId]
  )
  const relatedSchedules = useMemo(
    () => getSchedulesByArticle(articleId),
    [articleId]
  )

  if (!article) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p
          className="font-serif italic"
          style={{ fontSize: 14, color: '#3D3D3A' }}
        >
          Select an article from the navigation tree.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* ═══ SECTION 1 — Article Header ═══ */}
      <ArticleHeader article={article} onSavedChange={onSavedChange} />

      {/* ═══ SECTION 2 — Constitutional Text ═══ */}
      {article.original_text && (
        <div className="mt-4">
          <div
            className="font-sans uppercase tracking-[2px]"
            style={{ fontSize: 10, color: '#3D3D3A', marginBottom: 8 }}
          >
            Constitutional Text
          </div>
          <div
            className="rounded-r-lg"
            style={{
              background: '#F4F4F1',
              borderLeft: '4px solid #1C1C1E',
              padding: '20px 24px',
            }}
          >
            <div
              className="font-sans"
              style={{
                fontSize: 15,
                color: '#1C1C1E',
                lineHeight: 1.85,
                whiteSpace: 'pre-wrap',
              }}
            >
              {article.original_text}
            </div>
          </div>
        </div>
      )}

      {/* ═══ SECTION 3 — Plain Language ═══ */}
      {article.plain_language && (
        <div className="mt-4">
          <div
            className="font-sans uppercase tracking-[2px] flex items-center gap-1.5"
            style={{ fontSize: 10, color: '#3D3D3A', marginBottom: 8 }}
          >
            <Feather className="w-3 h-3" style={{ color: '#E31837' }} />
            What this means
          </div>
          <div
            className="rounded-r-lg"
            style={{
              background: '#FDF4DC',
              borderLeft: '4px solid #E31837',
              padding: '20px 24px',
            }}
          >
            <div
              className="font-sans"
              style={{
                fontSize: 15,
                color: '#1C1C1E',
                lineHeight: 1.85,
              }}
            >
              {article.plain_language}
            </div>
          </div>
        </div>
      )}

      {/* ═══ SECTION 4 — Amendment History (conditional) ═══ */}
      {article.amended && article.amendment_note && (
        <div className="mt-4">
          <button
            onClick={() => setAmendmentOpen((p) => !p)}
            className="w-full flex items-center justify-between rounded-xl p-4 transition-colors"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E8E8E4',
              cursor: 'pointer',
            }}
            aria-expanded={amendmentOpen}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-sans uppercase tracking-[2px]"
                style={{ fontSize: 10, color: '#3D3D3A' }}
              >
                Amendment History
              </span>
              <span
                className="font-sans"
                style={{
                  fontSize: 12,
                  color: '#737370',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 200,
                }}
              >
                {article.amendment_note.slice(0, 40)}
                {article.amendment_note.length > 40 ? '…' : ''}
              </span>
            </div>
            <ChevronDown
              className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
              style={{
                color: '#3D3D3A',
                transform: amendmentOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              }}
            />
          </button>

          {amendmentOpen && (
            <div
              className="rounded-b-xl p-4 -mt-px"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8E8E4',
                borderTop: 'none',
              }}
            >
              <div
                className="font-sans"
                style={{ fontSize: 13, color: '#1C1C1E', lineHeight: 1.7 }}
              >
                {article.amendment_note}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ SECTION 5 — Related Articles ═══ */}
      {article.related_articles.length > 0 && (
        <div className="mt-4">
          <div
            className="font-sans uppercase tracking-[2px]"
            style={{ fontSize: 10, color: '#3D3D3A', marginBottom: 8 }}
          >
            Read alongside
          </div>
          <div className="flex flex-wrap gap-2">
            {article.related_articles.map((relId) => {
              const relArt = getArticleById(relId)
              return (
                <button
                  key={relId}
                  onClick={() => onSelectArticle(relId)}
                  className="rounded-full font-sans transition-colors"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '5px 14px',
                    background: '#1C1C1E',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#E31837'
                    e.currentTarget.style.color = '#1C1C1E'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#1C1C1E'
                    e.currentTarget.style.color = '#FFFFFF'
                  }}
                  title={
                    relArt
                      ? `Art. ${relArt.article_number} — ${relArt.article_title}`
                      : relId
                  }
                >
                  Art. {relArt?.article_number || relId.replace('article_', '')}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ═══ SECTION 6 — Schedules panel (conditional) ═══ */}
      {relatedSchedules.length > 0 && (
        <div className="mt-6">
          <div
            className="font-sans uppercase tracking-[2px]"
            style={{ fontSize: 10, color: '#3D3D3A', marginBottom: 8 }}
          >
            Related Schedule
          </div>
          {relatedSchedules.map((sched) => (
            <div
              key={sched.schedule_id}
              className="rounded-xl p-4"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8E8E4',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div
                    className="font-mono"
                    style={{ fontSize: 12, color: '#3D3D3A' }}
                  >
                    {sched.schedule_number}
                  </div>
                  <div
                    className="font-serif mt-0.5"
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: '#1C1C1E',
                    }}
                  >
                    {sched.schedule_title}
                  </div>
                </div>
                <span
                  className="rounded-full font-sans uppercase tracking-[1px] flex-shrink-0"
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: '3px 10px',
                    background:
                      sched.upsc_importance === 'HIGH' ? '#1C1C1E' : '#E8E8E4',
                    color:
                      sched.upsc_importance === 'HIGH' ? '#FFFFFF' : '#3D3D3A',
                  }}
                >
                  {sched.upsc_importance}
                </span>
              </div>
              <div
                className="font-sans mt-2"
                style={{ fontSize: 13, color: '#1C1C1E', lineHeight: 1.7 }}
              >
                {sched.plain_language}
              </div>
              <button
                onClick={() => setScheduleModal(sched)}
                className="mt-2 font-sans transition-colors"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#1C1C1E',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                View full Schedule →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ═══ Embedded Zone C content for tablet/mobile ═══ */}
      <div className="mt-8 lg:hidden">
        <ContextPanelInline articleId={articleId} />
      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        schedule={scheduleModal}
        onClose={() => setScheduleModal(null)}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Inline Context Panel (used on tablet/mobile inside Zone B)         */
/* ------------------------------------------------------------------ */

function ContextPanelInline({ articleId }: { articleId: string }) {
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
    <div>
      <div className="flex items-center gap-4 border-b" style={{ borderColor: '#E8E8E4' }}>
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

      <div className="mt-4">
        {activeTab === 'cases' ? (
          relatedCases.length === 0 ? (
            <EmptyState text="No landmark Supreme Court judgment has specifically interpreted this Article in our database." />
          ) : (
            relatedCases.map((c) => <CaseCard key={c.case_id} caseData={c} />)
          )
        ) : relatedQuestions.length === 0 ? (
          <EmptyState text="This Article has not been directly referenced in a UPSC question between 2011 and 2024 in our database." />
        ) : (
          <>
            {mainsQuestions.length > 0 && (
              <div className="mb-4">
                <div
                  className="font-sans uppercase tracking-[2px] mb-2"
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
                  className="font-sans uppercase tracking-[2px] mb-2"
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
    <div className="py-8 text-center">
      <p
        className="font-serif italic px-4"
        style={{ fontSize: 14, color: '#3D3D3A' }}
      >
        {text}
      </p>
    </div>
  )
}

export { TabButton, EmptyState }
