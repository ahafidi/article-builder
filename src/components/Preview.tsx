"use client"

import hljs from 'highlight.js'
import { Remarkable } from 'remarkable'
import { linkify } from 'remarkable/linkify'

const md = new Remarkable({
  html: false,
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

import { ContentContext } from "@/components/Context"
import React from "react"

export default function Preview() {
  const { content } = React.useContext(ContentContext)

  return (
    <div
      className="p-5 prose"
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    />
  )
}
