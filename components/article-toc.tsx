'use client'

import { useEffect, useState } from 'react'

type TocItem = { id: string; heading: string }

export default function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-110px 0px -58% 0px', threshold: [0, 0.2, 0.6, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  return (
    <aside className="detail-toc" aria-label="Table of contents">
      <span>TABLE OF CONTENTS</span>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeId === item.id ? 'is-active' : undefined}
          aria-current={activeId === item.id ? 'location' : undefined}
        >
          {item.heading}
        </a>
      ))}
    </aside>
  )
}
