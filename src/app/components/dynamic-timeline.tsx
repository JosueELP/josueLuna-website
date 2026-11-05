"use client"

import { useState } from 'react'
import '../css/timeline.css'
import { Dictionary } from '../dictionaries';

const ChevronIcon = () => (
  <svg
    className="chevron"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

interface TimeLineProps {
  dictionary: Dictionary
}

export default function Timeline({ dictionary } : TimeLineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <div className="containerTimeline">
      <ol className="timeline">
        {dictionary.timeline.map((item, index) => {
          const isExpanded = expandedIndex === index
          const detailsId = `timeline-details-${index}`

          return (
            <li key={item.year + item.title} className={`item ${isExpanded ? 'expanded' : ''}`}>
              <span className="dot" aria-hidden="true" />
              <button
                type="button"
                className="itemHeader"
                aria-expanded={isExpanded}
                aria-controls={detailsId}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <span className="yearContainer">
                  <span className="year">{item.year}</span>
                  <ChevronIcon />
                </span>
                <span className="itemTitle">{item.title}</span>
                {item.subtitle && <span className="subtitle">{item.subtitle}</span>}
              </button>
              <div id={detailsId} className="details">
                <div className="detailsInner">
                  <ul className="highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  {item.tags && (
                    <ul className="tags">
                      {item.tags.map((tag) => (
                        <li key={tag} className="tag">{tag}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
