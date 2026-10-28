'use client'

import Link from 'next/link'
import { ArrowUpRight, Filter, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import BlogShell, { Pill } from '@/components/blog-shell'
import { publicArticles, categories } from '@/lib/articles'

export default function ArchivePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const filtered = useMemo(() => publicArticles.filter((article) => (category === 'All' || article.category === category) && `${article.title} ${article.description} ${article.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query, category])
  return <BlogShell><main className="container archive-page"><div className="page-intro"><span className="eyebrow">ARCHIVE / PUBLIC INDEX</span><h1>Research archive</h1><p>Search and filter the public notes. Draft investigations remain outside the index until they are ready.</p></div><div className="archive-controls"><label className="search-input"><Search /><input aria-label="Search archive" placeholder="Search notes..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><label className="filter-control"><Filter /><select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="archive-list">{filtered.map((article) => <Link className="archive-row" href={`/research/${article.slug}`} key={article.slug}><div><div className="card-topline"><span>{article.category}</span><span>{article.date}</span></div><h2>{article.title}</h2><p>{article.description}</p><div className="tag-row">{article.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div></div><ArrowUpRight /></Link>)}{!filtered.length && <p className="muted">No notes found.</p>}</div></main></BlogShell>
}
