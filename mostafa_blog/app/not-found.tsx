import Link from 'next/link'
import { FileText } from 'lucide-react'
import BlogShell from '@/components/blog-shell'

export default function NotFound() {
  return <BlogShell><main className="container not-found"><FileText /><h1>Page not found</h1><p>This page could not be found in the notebook.</p><Link className="button button-primary" href="/">Back to notebook</Link></main></BlogShell>
}
