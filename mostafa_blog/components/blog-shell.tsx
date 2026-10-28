'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ChevronRight, Menu, Moon, Search, Shield, Sun, X } from 'lucide-react'
import { publicArticles, type Article } from '@/lib/articles'

export function Pill({ children, tone = 'muted' }: { children: React.ReactNode; tone?: 'muted' | 'green' | 'amber' | 'red' | 'blue' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <Link href={`/research/${article.slug}`} className={`article-card ${featured ? 'article-card-featured' : ''}`}><div className="card-topline"><span>{article.category}</span><span>{article.date}</span></div><div className="card-title-row"><h3>{article.title}</h3><span aria-hidden="true">↗</span></div><p>{article.description}</p><div className="card-footer"><div className="tag-row">{article.tags.slice(0, 3).map((tag) => <Pill key={tag}>{tag}</Pill>)}</div><span className="read-time">{article.readTime}</span></div>{article.status !== 'published' && <Pill tone={article.status === 'demo' ? 'amber' : 'green'}>{article.status === 'demo' ? 'DEMO CONTENT' : 'DRAFT / LAB RESEARCH'}</Pill>}</Link>
}

const THEME_KEY = 'theme'

function Header({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = useState(false)
  const [lightMode, setLightMode] = useState(false)

  // Read the theme that the inline script in layout.tsx already applied (keeps the choice across pages / reloads).
  useEffect(() => {
    setLightMode(document.documentElement.classList.contains('light'))
  }, [])

  const toggleTheme = () => {
    const next = !lightMode
    setLightMode(next)
    document.documentElement.classList.toggle('light', next)
    try {
      localStorage.setItem(THEME_KEY, next ? 'light' : 'dark')
    } catch {}
  }

  const closeMenu = () => setOpen(false)

  return <header className="site-header"><div className="container nav-wrap"><Link href="/" className="brand"><Shield aria-hidden="true" /><span>mostafa</span><b>.Blog</b></Link><div className="nav-actions"><button className="icon-button search-trigger" aria-label="Search articles" onClick={onSearch}><Search aria-hidden="true" /><span>Search writeups, CVEs...</span></button><button className="icon-button theme-toggle" aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'} onClick={toggleTheme}>{lightMode ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}</button><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div>{open && <nav className="container mobile-nav" aria-label="Main menu"><Link href="/" onClick={closeMenu}>Home</Link><Link href="/archive" onClick={closeMenu}>Archive</Link><Link href="/about" onClick={closeMenu}>About</Link></nav>}</header>
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => publicArticles.filter((article) => `${article.title} ${article.description} ${article.category} ${article.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search articles"><div className="search-panel"><div className="search-head"><div><span className="eyebrow">INDEX SEARCH</span><h2>Find a research note</h2></div><button className="icon-button" onClick={onClose} aria-label="Close search"><X /></button></div><div className="search-input"><Search aria-hidden="true" /><input autoFocus placeholder="Search title, tag, category..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>ESC</kbd></div><div className="search-results">{results.map((article) => <Link key={article.slug} href={`/research/${article.slug}`} onClick={onClose}><span>{article.category}</span><strong>{article.title}</strong><ChevronRight /></Link>)}{results.length === 0 && <p className="muted">No matching notes in the public index.</p>}</div></div></div>
}

export default function BlogShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    if (!searchOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [searchOpen])

  return <><Header onSearch={() => setSearchOpen(true)} />{children}{searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}</>
}
