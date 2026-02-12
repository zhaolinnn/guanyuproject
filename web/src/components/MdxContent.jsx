import { MDXProvider } from '@mdx-js/react'

const base = 'font-rethink text-black/80 leading-relaxed '

const components = {
  h1: ({ children }) => (
    <h1 className="font-rethink text-3xl md:text-4xl text-black mb-6 mt-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-rethink text-2xl md:text-3xl text-black mb-4 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-rethink text-xl text-black mb-3 mt-6">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="my-3">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside my-3 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside my-3 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="ml-2">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="text-green-700 underline hover:text-green-800" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-black">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
}

/**
 * Wraps MDX content with the same prose styling as MarkdownContent.
 * Use with: import Content from './content/Page.mdx' then <MdxContent><Content /></MdxContent>
 */
export function MdxContent({ children, className = '' }) {
  return (
    <MDXProvider components={components}>
      <div className={base + className}>
        {children}
      </div>
    </MDXProvider>
  )
}
