"use client"

import React, { useState } from 'react'
import '../css/timeline.css'

interface TimelineItem {
  id: number
  year: string
  title: string
  description: string
}

const constructTimeLineData = dictionary => {
  const initialTimelineData: TimelineItem[] = [
    {
      id: 1,
      year: dictionary.timeLineDataYear1,
      title: dictionary.timeLineDataTitle1,
      description: dictionary.timeLineDataDescription1
    },
    {
      id: 2,
      year: dictionary.timeLineDataYear2,
      title: dictionary.timeLineDataTitle2,
      description: dictionary.timeLineDataDescription2
    },
    {
      id: 3,
      year: dictionary.timeLineDataYear3,
      title: dictionary.timeLineDataTitle3,
      description: dictionary.timeLineDataDescription3
    }
  ]

  return initialTimelineData;
  
};

const ChevronIcon: React.FC<{ direction: 'up' | 'down'; color: string }> = ({ direction, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {direction === 'up' ? (
      <polyline points="18 15 12 9 6 15" />
    ) : (
      <polyline points="6 9 12 15 18 9" />
    )}
  </svg>
)

interface TimeLineProps {
  dictionary: { [key: string]: string }
}

export default function Timeline({ dictionary } : TimeLineProps) {
  const [timelineData, setTimelineData] = useState(constructTimeLineData(dictionary))
  const [expandedId, setExpandedId] = useState<number | null>(1)
  const [animatingId, setAnimatingId] = useState<number | null>(null)

  const handleItemClick = (id: number) => {
    if (animatingId !== null) return // Prevent clicking during animation

    setExpandedId(expandedId === id ? null : id)
    setAnimatingId(id)

    setTimelineData(prevData => {
      const newData = [...prevData]
      const index = newData.findIndex(item => item.id === id)
      const [item] = newData.splice(index, 1)
      newData.unshift(item)
      return newData
    })

    // Reset animatingId after animation completes
    setTimeout(() => setAnimatingId(null), 300)
  }

  return (
    <div className="containerTimeline">
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className={`item ${animatingId === item.id ? 'animatingItem' : ''}`}
          >
            <div
              className={`dot ${
                expandedId === item.id ? 'activeDot' : 'inactiveDot'
              } ${animatingId === item.id ? 'animatingDot' : ''}`}
              onClick={() => handleItemClick(item.id)}
            />
            {index !== timelineData.length - 1 && <div className="line" />}
            <div className="yearContainer">
              <span className="year">{item.year}</span>
              <ChevronIcon
                direction={expandedId === item.id ? 'up' : 'down'}
                color={"#a4958b"}
              />
            </div>
            <h3 className="itemTitle">{item.title}</h3>
            <p className={`description ${expandedId === item.id ? 'expandedDescription' : ''}`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}