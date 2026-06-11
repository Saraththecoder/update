'use client'

import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import type { Schedule } from '@/lib/constitution-helpers'

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ScheduleModalProps {
  schedule: Schedule | null
  onClose: () => void
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ScheduleModal({
  schedule,
  onClose,
}: ScheduleModalProps) {
  /* ---- Lock body scroll when open ---- */
  useEffect(() => {
    if (schedule) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [schedule])

  /* ---- Escape key ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (schedule) {
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }
  }, [schedule, onClose])

  if (!schedule) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${schedule.schedule_number}: ${schedule.schedule_title}`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-lg rounded-xl p-6 max-h-[80vh] overflow-y-auto"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E8E8E4',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition-colors"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#3D3D3A',
          }}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-8">
          <div
            className="font-mono"
            style={{ fontSize: 12, color: '#3D3D3A' }}
          >
            {schedule.schedule_number}
          </div>
          <h2
            className="font-serif mt-1"
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: '#1C1C1E',
            }}
          >
            {schedule.schedule_title}
          </h2>
        </div>

        {/* Importance pill */}
        {schedule.upsc_importance && (
          <div className="mt-3">
            <span
              className="rounded-full font-sans uppercase tracking-[1px]"
              style={{
                fontSize: 10,
                fontWeight: 500,
                padding: '3px 10px',
                background:
                  schedule.upsc_importance === 'HIGH' ? '#1C1C1E' : '#E8E8E4',
                color:
                  schedule.upsc_importance === 'HIGH' ? '#FFFFFF' : '#3D3D3A',
              }}
            >
              UPSC: {schedule.upsc_importance}
            </span>
          </div>
        )}

        {/* Body: full text */}
        <div
          className="font-sans mt-4"
          style={{
            fontSize: 14,
            color: '#1C1C1E',
            lineHeight: 1.8,
          }}
        >
          {schedule.full_text || schedule.broad_content || 'No detailed content available.'}
        </div>

        {/* Memory trigger */}
        {schedule.memory_trigger && (
          <div
            className="mt-4 rounded-r-md"
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
              Memory trigger
            </div>
            <div
              className="font-sans mt-0.5"
              style={{
                fontSize: 13,
                color: '#1C1C1E',
                fontStyle: 'italic',
              }}
            >
              {schedule.memory_trigger}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
