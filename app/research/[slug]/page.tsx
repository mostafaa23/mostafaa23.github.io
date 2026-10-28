import Link from 'next/link'
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, Clock3, FileText, LockKeyhole, ShieldAlert } from 'lucide-react'
import BlogShell, { Pill } from '@/components/blog-shell'
import ArticleToc from '@/components/article-toc'
import CopyButton from '@/components/copy-button'
import { articles, publicArticles, type ArticleSection } from '@/lib/articles'

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

function SectionContent({ section }: { section: ArticleSection }) {
  return (
    <section id={section.id}>
      <span className="detail-kicker">{section.kicker}</span>
      <h2>{section.heading}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
      {section.code && <div className="detail-code"><div><span>{section.code.label}</span><CopyButton value={section.code.value} /></div><pre><code>{section.code.value}</code></pre></div>}
      {section.table && <div className="detail-table-wrap"><table><thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>}
    </section>
  )
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) return <BlogShell><main className="container not-found"><FileText /><h1>Research note unavailable</h1><p>This note could not be found in the notebook.</p><Link className="button button-primary" href="/">Back to notebook</Link></main></BlogShell>
  const index = publicArticles.findIndex((item) => item.slug === slug)
  const previous = publicArticles[index + 1]
  const next = publicArticles[index - 1]
  return <BlogShell><main className="research-detail"><div className="research-shell"><Link className="detail-back" href="/"><ArrowLeft /> Back to research</Link><div className="research-grid"><div className="research-main"><header className="detail-hero"><div className="detail-badges"><Pill tone="red"><ShieldAlert /> Critical Severity</Pill><Pill><LockKeyhole /> Responsible Disclosure</Pill><Pill tone="blue"><CheckCircle2 /> Authorized Testing</Pill><Pill tone="green"><Check /> Evidence-led</Pill></div><h1>{article.title}</h1><div className="detail-meta"><span>Mostafa</span><i>·</i><span><CalendarDays /> {article.date}</span><i>·</i><span><Clock3 /> {article.readTime}</span>{article.status === 'demo' && <Pill tone="amber">DEMO CONTENT</Pill>}{article.status === 'draft' && <Pill tone="amber">DRAFT / LAB RESEARCH</Pill>}</div></header><section className="detail-tldr"><strong>TL;DR</strong><p>{article.description}</p></section><div className="finding-stats"><div><strong>{String(article.content.length).padStart(2, '0')}</strong><span>Sections</span></div><div><strong>100%</strong><span>Authorized testing</span></div><div><strong>{article.status === 'demo' ? 'DEMO' : article.status === 'draft' ? 'DRAFT' : 'PUBLISHED'}</strong><span>Evidence status</span></div><div><strong>01</strong><span>Research note</span></div></div><article className="detail-prose">{article.content.map((section) => <SectionContent key={section.id} section={section} />)}</article><nav className="article-navigation">{previous ? <Link href={`/research/${previous.slug}`}><span>Previous note</span><strong>{previous.title}</strong><ArrowLeft /></Link> : <span />}{next && <Link href={`/research/${next.slug}`}><span>Next note</span><strong>{next.title}</strong><ArrowRight /></Link>}</nav><Link className="detail-back detail-back-bottom" href="/"><ArrowLeft /> Back to all writeups</Link></div><ArticleToc items={article.content.map(({ id, heading }) => ({ id, heading }))} /></div></div></main></BlogShell>
}
