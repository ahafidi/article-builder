"use client"

import hljs from 'highlight.js'
import React from "react"
import Latex from 'react-latex-next'
import { Remarkable } from 'remarkable'
import { linkify } from 'remarkable/linkify'

import { ContentContext } from "@/components/Context"

import 'katex/dist/katex.min.css'

const md = new Remarkable({
  html: false, // do not remove!
  xhtmlOut: true,
  breaks: true,
  langPrefix: 'language-',
  linkTarget: '_blank',
  typographer: false,

  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (err) { }
    }

    try {
      return hljs.highlightAuto(code).value
    } catch (err) { }

    return '' // use external default escaping
  }
}).use(linkify)
md.core.ruler.enable([
  'abbr'
])
md.block.ruler.enable([
  'footnote',
  'deflist'
])
md.inline.ruler.enable([
  'footnote_inline',
  'ins',
  'mark',
  'sub',
  'sup'
])

export default function Preview() {
  const { content } = React.useContext(ContentContext)

  const markdownContent = md.render(content)

  return (
    <div className='p-5 prose dark:prose-invert'>
      <Latex
        delimiters={[
          { left: '$$', right: '$$', display: true },
          { left: '\\(', right: '\\)', display: false },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
        ]}
      >
        {markdownContent}
      </Latex>
    </div>
  )
}
